#!/usr/bin/env python3
"""Local preview server with live reload.

    python3 serve.py            # http://localhost:5173
    python3 serve.py --port 8000

Serves this folder and refreshes the browser whenever a file changes
(CSS edits are hot-swapped without a full reload). The reload snippet is
injected into HTML responses on the fly, so nothing dev-only ends up in
your site files — the folder can be deployed as-is.
"""
import argparse
import errno
import json
import os
import threading
import time
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))
WATCH_EXT = {'.html', '.css', '.js', '.json', '.svg', '.png', '.jpg', '.jpeg',
             '.webp', '.gif', '.ico', '.woff2', '.txt', '.bib', '.pdf'}

SNIPPET = b"""<script>/* live reload - injected by serve.py, not part of the site */
(function () {
  var es = new EventSource('/__livereload');
  es.onmessage = function (e) {
    var paths = JSON.parse(e.data).paths || [];
    var cssOnly = paths.length && paths.every(function (p) { return /\\.css$/.test(p); });
    if (!cssOnly) return location.reload();
    document.querySelectorAll('link[rel="stylesheet"]').forEach(function (l) {
      var u = new URL(l.href, location.href);
      if (u.origin !== location.origin) return;
      u.searchParams.set('_lr', Date.now());
      l.href = u.href;
    });
  };
})();
</script>
"""


class Watcher:
    """Polls the folder and bumps a version number whenever a file changes."""

    def __init__(self, root, interval=0.25):
        self.root = root
        self.interval = interval
        self.version = 0
        self.changed = []
        self.cond = threading.Condition()
        self.snapshot = self.scan()
        threading.Thread(target=self.run, daemon=True).start()

    def scan(self):
        snap = {}
        for dirpath, dirnames, filenames in os.walk(self.root):
            dirnames[:] = [d for d in dirnames if not d.startswith('.') and d != '__pycache__']
            for name in filenames:
                if os.path.splitext(name)[1].lower() in WATCH_EXT:
                    path = os.path.join(dirpath, name)
                    try:
                        snap[path] = os.stat(path).st_mtime_ns
                    except OSError:
                        pass
        return snap

    def run(self):
        while True:
            time.sleep(self.interval)
            new = self.scan()
            if new == self.snapshot:
                continue
            time.sleep(0.12)  # let editors finish writing before we reload
            new = self.scan()
            changed = sorted(p for p in set(new) | set(self.snapshot)
                             if new.get(p) != self.snapshot.get(p))
            self.snapshot = new
            rel = [os.path.relpath(p, self.root).replace(os.sep, '/') for p in changed]
            with self.cond:
                self.version += 1
                self.changed = rel
                self.cond.notify_all()
            print('  changed:', ', '.join(rel), flush=True)


class Handler(SimpleHTTPRequestHandler):
    watcher = None

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def log_message(self, fmt, *args):
        pass

    def do_GET(self):
        path = self.path.split('?', 1)[0].split('#', 1)[0]
        if path == '/__livereload':
            return self.stream()
        fs_path = self.translate_path(path)
        if os.path.isdir(fs_path) and path.endswith('/'):
            fs_path = os.path.join(fs_path, 'index.html')
        if fs_path.endswith('.html') and os.path.isfile(fs_path):
            with open(fs_path, 'rb') as f:
                body = f.read()
            i = body.lower().rfind(b'</body>')
            body = body[:i] + SNIPPET + body[i:] if i != -1 else body + SNIPPET
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return None
        return super().do_GET()

    def stream(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/event-stream')
        self.send_header('Connection', 'keep-alive')
        self.end_headers()
        w = self.watcher
        seen = w.version
        try:
            self.wfile.write(b': connected\n\n')
            self.wfile.flush()
            while True:
                with w.cond:
                    w.cond.wait_for(lambda: w.version != seen, timeout=15)
                    version, changed = w.version, list(w.changed)
                if version == seen:
                    self.wfile.write(b': ping\n\n')
                else:
                    # Missed an intermediate change? Fall back to a full reload.
                    paths = changed if version == seen + 1 else ['*']
                    seen = version
                    self.wfile.write(b'data: ' + json.dumps({'paths': paths}).encode() + b'\n\n')
                self.wfile.flush()
        except (BrokenPipeError, ConnectionResetError):
            pass


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument('--port', type=int, default=5173)
    parser.add_argument('--host', default='127.0.0.1')
    args = parser.parse_args()

    try:
        server = ThreadingHTTPServer((args.host, args.port), partial(Handler, directory=ROOT))
    except OSError as e:
        if e.errno != errno.EADDRINUSE:
            raise
        print(f'Port {args.port} is already in use: the preview server is probably already running.\n'
              f'  -> just open http://localhost:{args.port}\n'
              f'  -> or start another one: python3 serve.py --port {args.port + 1}')
        raise SystemExit(1)
    Handler.watcher = Watcher(ROOT)
    server.daemon_threads = True
    print(f'Serving {ROOT}\n  -> http://localhost:{args.port}  (live reload on)', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nstopped')


if __name__ == '__main__':
    main()

(function () {
  'use strict';

  var $ = function (sel, el) { return (el || document).querySelector(sel); };
  var $$ = function (sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var header = $('[data-header]');

  /* ---------- Theme ---------- */

  var themeBtn = $('[data-theme-toggle]');
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  var currentTheme = function () { return root.dataset.theme || (systemDark.matches ? 'dark' : 'light'); };

  function syncThemeButton() {
    if (!themeBtn) return;
    var dark = currentTheme() === 'dark';
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
      syncThemeButton();
    });
    if (systemDark.addEventListener) systemDark.addEventListener('change', syncThemeButton);
    syncThemeButton();
  }

  /* ---------- Header: red while scrolling the hero, solid once past it ---------- */

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    });
  }
  if (header) {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var hero = $('.hero');
  if (header && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-solid', !entries[0].isIntersecting);
    }, { rootMargin: '-' + (header.offsetHeight + 1) + 'px 0px 0px 0px' }).observe(hero);
  }

  /* ---------- Mobile menu ---------- */

  var navToggle = $('.nav-toggle');
  function setMenu(open) {
    if (!navToggle) return;
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    header.classList.toggle('is-open', open);
  }
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
    });
    $('#nav-links').addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('click', function (e) { if (!header.contains(e.target)) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---------- Scroll spy ---------- */

  var navLinks = {};
  $$('#nav-links a').forEach(function (a) { navLinks[a.hash.slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Object.keys(navLinks).forEach(function (id) { navLinks[id].removeAttribute('aria-current'); });
        if (navLinks[entry.target.id]) navLinks[entry.target.id].setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(navLinks).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  /* ---------- Reveal on scroll ---------- */

  var reveals = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { revealer.observe(el); });
  }

  /* ---------- Email links: written as user|domain in the HTML ---------- */

  $$('[data-email]').forEach(function (a) {
    var parts = a.getAttribute('data-email').split('|');
    var address = parts[0] + '@' + parts[1];
    a.href = 'mailto:' + address;
    a.textContent = address;
  });

  /* ---------- WeChat icon: jump to Contact and unfold the QR code ---------- */

  $$('[data-open-wechat]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var wechat = $('details.wechat');
      if (!wechat) return;
      e.preventDefault();
      wechat.open = true;
      wechat.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    });
  });

  /* ---------- Placeholder links (fill these in index.html) ---------- */

  $$('a[data-todo][href="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });

  /* ---------- News: the left nav shows one year at a time ---------- */

  var newsNav = $('[data-news-nav]');
  var newsYears = $$('.news__year');
  if (newsNav && newsYears.length > 1) {
    newsNav.innerHTML = newsYears.map(function (block) {
      var year = $('.news__label', block).textContent.trim();
      block.id = 'news-' + year;
      block.setAttribute('data-part', year);
      return '<a href="#news-' + year + '" data-part="' + year + '">' + year + '</a>';
    }).join('');

    var showNewsYear = function (year, animate) {
      newsYears.forEach(function (block) {
        var on = block.getAttribute('data-part') === year;
        block.hidden = !on;
        if (on && animate) {
          block.classList.remove('is-entering');
          void block.offsetWidth;
          block.classList.add('is-entering');
        }
      });
      $$('a', newsNav).forEach(function (a) {
        if (a.getAttribute('data-part') === year) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    };
    showNewsYear(newsYears[0].getAttribute('data-part'), false);

    newsNav.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-part]');
      if (!a) return;
      e.preventDefault();
      showNewsYear(a.getAttribute('data-part'), true);
      var top = $('#news').getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.6) {
        $('#news').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  }

  /* ---------- Publications ---------- */

  var list = $('[data-pub-list]');
  var pubs = window.PUBLICATIONS || [];
  if (!list || !pubs.length) return;

  var ME = window.SITE_ME || '';
  var LINK_LABELS = {
    paper: 'Paper', arxiv: 'arXiv', pdf: 'PDF', doi: 'DOI', code: 'Code',
    project: 'Project', slides: 'Slides', poster: 'Poster', video: 'Video'
  };

  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var isFirst = function (p) { return p.authors[0] === ME; };

  function authorsHTML(p) {
    var a = p.authors;
    var me = a.indexOf(ME);
    var fmt = function (name, i) { return i === me ? '<strong class="me">' + esc(name) + '</strong>' : esc(name); };
    if (a.length <= 12) return a.map(fmt).join(', ');

    // Long author lists: first five, you, and the last author — the rest on demand.
    var keep = { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1 };
    keep[a.length - 1] = 1;
    if (me >= 0) keep[me] = 1;
    var parts = [];
    var gap = false;
    a.forEach(function (name, i) {
      if (keep[i]) {
        if (gap) parts.push('…');
        parts.push(fmt(name, i));
        gap = false;
      } else {
        gap = true;
      }
    });
    var hidden = a.length - Object.keys(keep).length;
    return '<span data-authors-short>' + parts.join(', ') +
      ' <button class="pub__more" type="button" data-expand>+' + hidden + ' more</button></span>' +
      '<span data-authors-full hidden>' + a.map(fmt).join(', ') + '</span>';
  }

  function itemHTML(p, inFirstPart) {
    var links = p.links || {};
    var main = links.paper || links.arxiv || links.doi || links.pdf || '';
    var title = main
      ? '<a href="' + esc(main) + '" target="_blank" rel="noopener">' + esc(p.title) + '</a>'
      : esc(p.title);
    var linkHTML = Object.keys(LINK_LABELS).filter(function (k) { return links[k]; }).map(function (k) {
      return '<a class="plink" href="' + esc(links[k]) + '" target="_blank" rel="noopener">' + LINK_LABELS[k] + '</a>';
    }).join('');

    return '<li class="pub"' + (inFirstPart ? '' : ' id="pub-' + esc(p.id) + '"') + '>' +
      '<div class="pub__side"><span class="badge badge--' + esc(p.type || 'conference') + '">' + esc(p.venue) + '</span></div>' +
      '<div class="pub__body">' +
        '<h4 class="pub__title">' + title + '</h4>' +
        '<p class="pub__authors">' + authorsHTML(p) + '</p>' +
        '<p class="pub__where">' + esc(p.venueFull || p.venue) +
          (p.note ? ' · <span class="pub__note">' + esc(p.note) + '</span>' : '') + '</p>' +
        '<div class="pub__foot">' +
          (isFirst(p) && !inFirstPart ? '<span class="pub__flag">First author</span>' : '') +
          (p.role ? '<span class="pub__flag">' + esc(p.role) + '</span>' : '') +
          '<span class="pub__links">' + linkHTML + '</span>' +
        '</div>' +
      '</div>' +
    '</li>';
  }

  function render() {
    var items = pubs.slice();
    var byYear = function (a, b) { return b.year - a.year; }; // stable: keeps file order within a year
    var mine = items.filter(isFirst).sort(byYear);
    var parts = [];
    if (mine.length) parts.push({ key: 'first', title: 'First Author', items: mine });
    items.sort(byYear).forEach(function (p) {
      var last = parts[parts.length - 1];
      if (!last || last.key !== String(p.year)) parts.push(last = { key: String(p.year), title: String(p.year), items: [] });
      last.items.push(p);
    });

    // Only the part picked in the left nav is shown.
    var keys = parts.map(function (part) { return part.key; });
    if (keys.indexOf(openPart) === -1) openPart = keys[0];
    list.innerHTML = parts.filter(function (part) { return part.key === openPart; }).map(partHTML).join('');
    renderYearNav(parts);
  }

  var openPart = 'first'; // key of the part shown: 'first' or a year
  var yearNav = $('[data-year-nav]');

  function partHTML(part) {
    var inFirst = part.key === 'first';
    return '<section class="pub-group" id="pubs-' + part.key + '" data-part="' + part.key + '">' +
      '<h3 class="pub-group__head">' +
        '<span class="pub-group__title">' + esc(part.title) + '</span>' +
      '</h3>' +
      '<ol class="pubs">' + part.items.map(function (p) { return itemHTML(p, inFirst); }).join('') + '</ol>' +
    '</section>';
  }

  function renderYearNav(parts) {
    if (!yearNav) return;
    var links = [];
    parts.forEach(function (part) {
      if (part.key !== 'first' && links.length <= 1) links.push('<span class="year-nav__label">All papers</span>');
      var current = part.key === openPart ? ' aria-current="true"' : '';
      links.push('<a href="#pubs-' + part.key + '" data-part="' + part.key + '"' + current + '>' +
        esc(part.title) + '</a>');
    });
    yearNav.hidden = parts.length < 2;
    yearNav.innerHTML = links.join('');
  }

  function showPart(key) {
    openPart = key;
    render();
    var group = document.getElementById('pubs-' + key);
    if (!group) return;
    group.classList.add('is-entering');
    var top = group.getBoundingClientRect().top;
    if (top < 90 || top > window.innerHeight * 0.6) {
      group.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }

  if (yearNav) {
    yearNav.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-part]');
      if (!a) return;
      e.preventDefault();
      showPart(a.getAttribute('data-part'));
    });
  }

  list.addEventListener('click', function (e) {
    var more = e.target.closest('[data-expand]');
    if (!more) return;
    var authors = more.closest('.pub__authors');
    $('[data-authors-short]', authors).hidden = true;
    $('[data-authors-full]', authors).hidden = false;
  });

  // Links such as #pub-highratemos jump to (and highlight) a paper, switching to its year first.
  function focusPub(id) {
    var paper = pubs.filter(function (p) { return 'pub-' + p.id === id; })[0];
    if (paper && openPart !== String(paper.year)) {
      openPart = String(paper.year);
      render();
    }
    var el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    el.classList.remove('is-flash');
    void el.offsetWidth;
    el.classList.add('is-flash');
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#pub-"]');
    if (!a) return;
    e.preventDefault();
    focusPub(a.getAttribute('href').slice(1));
  });

  render();

  // A shared link such as …/#pub-highratemos opens that paper once; the hash is then
  // dropped so a later refresh starts from the top instead of jumping there again.
  if (location.hash.indexOf('#pub-') === 0) {
    var target = location.hash.slice(1);
    history.replaceState(null, '', location.pathname + location.search);
    focusPub(target);
  }
})();

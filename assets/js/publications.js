/*
 * Publications — edit this file to update the list on the site.
 *
 *   id         unique slug; the entry can be linked as #pub-<id>
 *   title, authors, year
 *   venue      short badge text, e.g. "ICASSP 2025"
 *   venueFull  full venue line shown under the authors
 *   type       journal | conference | workshop | preprint   (controls the badge style)
 *   topics     keys from PUBLICATION_TOPICS below (kept for reference, not shown on the page)
 *   citations  Google Scholar count (kept for reference, not shown on the page)
 *   links      any of: paper, arxiv, pdf, doi, code, project, slides, poster, video
 *   note       optional short remark, e.g. "Long paper"
 *   role       optional contribution tag shown like "First author", e.g. "Core contributor"
 *
 * Papers are grouped by year; within a year they appear in the order listed here.
 * Citation counts from Google Scholar, September 2026.
 */

window.SITE_ME = "Wenze Ren";

window.PUBLICATION_TOPICS = {
  enhancement: "Speech Enhancement",
  assessment: "Quality Assessment",
  alm: "Audio Language Models",
  health: "Digital Health",
  data: "Datasets & Benchmarks",
};

window.PUBLICATIONS = [
  {
    id: "encoder-selection",
    title: "Correlation-Guided Encoder Selection for Multi-Encoder Large Audio-Language Models",
    authors: [
      "Pei-Jun Liao", "Hung-Shin Lee", "Wenze Ren", "Kuo-Hsuan Hung", "Hung-yi Lee", "Hsin-Min Wang"
    ],
    year: 2026,
    venue: "SLT 2026",
    venueFull: "IEEE Spoken Language Technology Workshop (SLT 2026)",
    type: "conference",
    topics: ["alm"],
    citations: 0,
    links: {
      arxiv: "https://arxiv.org/abs/2609.18041",
      pdf: "https://arxiv.org/pdf/2609.18041",
    },
  },
  {
    id: "rrp-voice",
    title: "RRP-Voice: A Longitudinal Dataset and Benchmark for Recurrent Respiratory Papillomatosis Detection",
    authors: [
      "Wenze Ren", "Ke-Han Lu", "Kai-Wei Chang", "Tiantian Feng", "Ching Fang", "Zhi-Chi Liao",
      "Dao Thi Hai Yen", "Syu-Siang Wang", "Yu Tsao", "Chi-Te Wang", "Shih-Hau Fang"
    ],
    year: 2026,
    venue: "APSIPA ASC 2026",
    venueFull: "Asia Pacific Signal and Information Processing Association Annual Summit and Conference (APSIPA ASC 2026)",
    type: "conference",
    topics: ["health", "data"],
    citations: 0,
    links: {
      arxiv: "https://arxiv.org/abs/2606.01639",
      pdf: "https://arxiv.org/pdf/2606.01639",
    },
  },
  {
    id: "taigispeech",
    title: "TaigiSpeech: A Low-Resource Real-World Speech Intent Dataset and Preliminary Results with Scalable Data Mining In-the-Wild",
    authors: [
      "Kai-Wei Chang", "Yi-Cheng Lin", "Huang-Cheng Chou", "Wenze Ren", "Yu-Han Huang",
      "Yun-Shao Tsai", "Chien-Cheng Chen", "Yu Tsao", "Yuan-Fu Liao", "Shrikanth Narayanan",
      "James Glass", "Hung-yi Lee"
    ],
    year: 2026,
    venue: "Interspeech 2026",
    venueFull: "Interspeech 2026",
    type: "conference",
    note: "Long paper",
    role: "Core contributor",
    topics: ["data"],
    citations: 2,
    links: {
      arxiv: "https://arxiv.org/abs/2603.21478",
      pdf: "https://arxiv.org/pdf/2603.21478",
    },
  },
  {
    id: "akb",
    title: "How Auditory Knowledge in LLM Backbones Shapes Audio Language Models: A Holistic Evaluation",
    authors: [
      "Ke-Han Lu", "Szu-Wei Fu", "Chao-Han Huck Yang", "Zhehuai Chen", "Sung-Feng Huang",
      "Chih-Kai Yang", "Yi-Cheng Lin", "Chi-Yuan Hsiao", "Wenze Ren", "En-Pei Hu", "Yu-Han Huang",
      "An-Yu Cheng", "Cheng-Han Chiang", "Yu Tsao", "Yu-Chiang Frank Wang", "Hung-yi Lee"
    ],
    year: 2026,
    venue: "SLT 2026",
    venueFull: "IEEE Spoken Language Technology Workshop (SLT 2026)",
    type: "conference",
    topics: ["alm"],
    citations: 2,
    links: {
      arxiv: "https://arxiv.org/abs/2603.19195",
      pdf: "https://arxiv.org/pdf/2603.19195",
      project: "https://kehanlu.github.io/AKB",
    },
  },
  {
    id: "mos-bias",
    title: "MOS-Bias: From Hidden Gender Bias to Gender-Aware Speech Quality Assessment",
    authors: [
      "Wenze Ren", "Yi-Cheng Lin", "Wen-Chin Huang", "Erica Cooper", "Ryandhimas E. Zezario",
      "Hsin-Min Wang", "Hung-yi Lee", "Yu Tsao"
    ],
    year: 2026,
    venue: "Interspeech 2026",
    venueFull: "Interspeech 2026",
    type: "conference",
    topics: ["assessment"],
    citations: 3,
    links: {
      arxiv: "https://arxiv.org/abs/2603.10723",
      pdf: "https://arxiv.org/pdf/2603.10723",
    },
  },
  {
    id: "tw-sound580k",
    title: "TW-Sound580K: A Regional Audio-Text Dataset with Verification-Guided Curation for Localized Audio-Language Modeling",
    authors: [
      "Hao-Hui Xie", "Ho-Lam Chung", "Yi-Cheng Lin", "Ke-Han Lu", "Wenze Ren", "Xie Chen",
      "Hung-yi Lee"
    ],
    year: 2026,
    venue: "arXiv 2026",
    venueFull: "arXiv preprint arXiv:2603.05094",
    type: "preprint",
    topics: ["alm", "data"],
    citations: 0,
    links: {
      arxiv: "https://arxiv.org/abs/2603.05094",
      pdf: "https://arxiv.org/pdf/2603.05094",
    },
  },
  {
    id: "game-time",
    title: "Game-Time: Evaluating Temporal Dynamics in Spoken Language Models",
    authors: [
      "Kai-Wei Chang", "En-Pei Hu", "Chun-Yi Kuan", "Wenze Ren", "Wei-Chih Chen", "Guan-Ting Lin",
      "Yu Tsao", "Shao-Hua Sun", "Hung-yi Lee", "James Glass"
    ],
    year: 2026,
    venue: "ICASSP 2026",
    venueFull: "IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP 2026)",
    type: "conference",
    topics: ["alm", "data"],
    citations: 13,
    links: {
      arxiv: "https://arxiv.org/abs/2509.26388",
      pdf: "https://arxiv.org/pdf/2509.26388",
    },
  },
  {
    id: "desta25-audio",
    title: "DeSTA2.5-Audio: Toward General-Purpose Large Audio Language Model with Self-Generated Cross-Modal Alignment",
    authors: [
      "Ke-Han Lu", "Zhehuai Chen", "Szu-Wei Fu", "Chao-Han Huck Yang", "Sung-Feng Huang",
      "Chih-Kai Yang", "Chee-En Yu", "Chun-Wei Chen", "Wei-Chih Chen", "Chien-yu Huang",
      "Yi-Cheng Lin", "Yu-Xiang Lin", "Chi-An Fu", "Chun-Yi Kuan", "Wenze Ren", "Xuanjun Chen",
      "Wei-Ping Huang", "En-Pei Hu", "Tzu-Quan Lin", "Yuan-Kuei Wu", "Kuan-Po Huang",
      "Hsiao-Ying Huang", "Huang-Cheng Chou", "Kai-Wei Chang", "Cheng-Han Chiang", "Boris Ginsburg",
      "Yu-Chiang Frank Wang", "Hung-yi Lee"
    ],
    year: 2026,
    venue: "TASLP 2026",
    venueFull: "IEEE Transactions on Audio, Speech and Language Processing",
    type: "journal",
    topics: ["alm"],
    citations: 71,
    links: {
      arxiv: "https://arxiv.org/abs/2507.02768",
      pdf: "https://arxiv.org/pdf/2507.02768",
      code: "https://github.com/kehanlu/DeSTA2.5-Audio",
    },
  },
  {
    id: "codecfake-plus",
    title: "CodecFake+: Codec-Based Resynthesized Data as a Proxy for Detecting CodecFake Speech",
    authors: [
      "Xuanjun Chen", "Jiawei Du", "Haibin Wu", "Lin Zhang", "I-Ming Lin", "I-Hsiang Chiu",
      "Wenze Ren", "Yuan Tseng", "Yu Tsao", "Jyh-Shing Roger Jang", "Hung-yi Lee"
    ],
    year: 2026,
    venue: "TASLP 2026",
    venueFull: "IEEE Transactions on Audio, Speech and Language Processing",
    type: "journal",
    topics: ["data"],
    citations: 26,
    links: {
      arxiv: "https://arxiv.org/abs/2501.08238",
      pdf: "https://arxiv.org/pdf/2501.08238",
    },
  },
  {
    id: "highratemos",
    title: "HighRateMOS: Sampling-Rate Aware Modeling for Speech Quality Assessment",
    authors: [
      "Wenze Ren", "Yi-Cheng Lin", "Wen-Chin Huang", "Ryandhimas E. Zezario", "Szu-Wei Fu",
      "Sung-Feng Huang", "Erica Cooper", "Haibin Wu", "Hung-Yu Wei", "Hsin-Min Wang", "Hung-yi Lee",
      "Yu Tsao"
    ],
    year: 2025,
    venue: "ASRU 2025",
    venueFull: "IEEE Automatic Speech Recognition and Understanding Workshop (ASRU 2025)",
    type: "conference",
    topics: ["assessment"],
    citations: 5,
    links: {
      arxiv: "https://arxiv.org/abs/2506.21951",
      pdf: "https://arxiv.org/pdf/2506.21951",
    },
  },
  {
    id: "bav-mossformer2",
    title: "BAV-MossFormer2: Enhanced MossFormer2 for Binaural Audio-Visual Speech Enhancement",
    authors: [
      "Wenze Ren", "Kai Li", "Rong Chao", "Junjie Li", "Zilong Huang", "Shafique Ahmed", "You-Jin Li",
      "Kuo-Hsuan Hung", "Syu-Siang Wang", "Hsin-Min Wang", "Yu Tsao"
    ],
    year: 2025,
    venue: "AVSEC 2025",
    venueFull: "Interspeech 2025 Workshop: 4th COG-MHEAR Audio-Visual Speech Enhancement Challenge (AVSEC 2025), pp. 79–80",
    type: "workshop",
    topics: ["enhancement"],
    citations: 2,
    links: {
      paper: "https://www.isca-archive.org/avsec_2025/ren25_avsec.html",
    },
  },
  {
    id: "fullface-mamba-avse",
    title: "Leveraging Mamba with Full-Face Vision for Audio-Visual Speech Enhancement",
    authors: [
      "Rong Chao", "Wenze Ren", "You-Jin Li", "Kuo-Hsuan Hung", "Sung-Feng Huang", "Szu-Wei Fu",
      "Wen-Huang Cheng", "Yu Tsao"
    ],
    year: 2025,
    venue: "AVSEC 2025",
    venueFull: "Interspeech 2025 Workshop: 4th COG-MHEAR Audio-Visual Speech Enhancement Challenge (AVSEC 2025)",
    type: "workshop",
    topics: ["enhancement"],
    citations: 2,
    links: {
      paper: "https://www.isca-archive.org/avsec_2025/chao25_avsec.html",
      arxiv: "https://arxiv.org/abs/2508.13624",
      pdf: "https://arxiv.org/pdf/2508.13624",
    },
  },
  {
    id: "toxictone",
    title: "ToxicTone: A Mandarin Audio Dataset Annotated for Toxicity and Toxic Utterance Tonality",
    authors: [
      "Yu-Xiang Luo", "Yi-Cheng Lin", "Ming-To Chuang", "Jia-Hung Chen", "I-Ning Tsai",
      "Pei Xing Kiew", "Yueh-Hsuan Huang", "Chien-Feng Liu", "Yu-Chen Chen", "Bo-Han Feng",
      "Wenze Ren", "Hung-yi Lee"
    ],
    year: 2025,
    venue: "Interspeech 2025",
    venueFull: "Interspeech 2025",
    type: "conference",
    topics: ["data"],
    citations: 6,
    links: {
      arxiv: "https://arxiv.org/abs/2505.15773",
      pdf: "https://arxiv.org/pdf/2505.15773",
    },
  },
  {
    id: "mamba-multichannel-se",
    title: "Leveraging Joint Spectral and Spatial Learning with MAMBA for Multichannel Speech Enhancement",
    authors: [
      "Wenze Ren", "Haibin Wu", "Yi-Cheng Lin", "Xuanjun Chen", "Rong Chao", "Kuo-Hsuan Hung",
      "You-Jin Li", "Wen-Yuan Ting", "Hsin-Min Wang", "Yu Tsao"
    ],
    year: 2025,
    venue: "ICASSP 2025",
    venueFull: "IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP 2025)",
    type: "conference",
    topics: ["enhancement"],
    citations: 7,
    links: {
      arxiv: "https://arxiv.org/abs/2409.10376",
      pdf: "https://arxiv.org/pdf/2409.10376",
    },
  },
  {
    id: "dynamic-superb-2",
    title: "Dynamic-SUPERB Phase-2: A Collaboratively Expanding Benchmark for Measuring the Capabilities of Spoken Language Models with 180 Tasks",
    authors: [
      "Chien-yu Huang", "Wei-Chih Chen", "Shu-wen Yang", "Andy T. Liu", "Chen-An Li", "Yu-Xiang Lin",
      "Wei-Cheng Tseng", "Anuj Diwan", "Yi-Jen Shih", "Jiatong Shi", "William Chen", "Chih-Kai Yang",
      "Wenze Ren", "Xuanjun Chen", "Chi-Yuan Hsiao", "Puyuan Peng", "Shih-Heng Wang", "Chun-Yi Kuan",
      "Ke-Han Lu", "Kai-Wei Chang", "Fabian Ritter-Gutierrez", "Kuan-Po Huang", "Siddhant Arora",
      "You-Kuan Lin", "Ming To Chuang", "Eunjung Yeo", "Kalvin Chang", "Chung-Ming Chien",
      "Kwanghee Choi", "Jun-You Wang", "Cheng-Hsiu Hsieh", "Yi-Cheng Lin", "Chee-En Yu",
      "I-Hsiang Chiu", "Heitor R. Guimarães", "Jionghao Han", "Tzu-Quan Lin", "Tzu-Yuan Lin",
      "Homu Chang", "Ting-Wu Chang", "Chun Wei Chen", "Shou-Jen Chen", "Yu-Hua Chen", "Hsi-Chun Cheng",
      "Kunal Dhawan", "Jia-Lin Fang", "Shi-Xin Fang", "Kuan-Yu Fang Chiang", "Chi An Fu",
      "Hsien-Fu Hsiao", "Ching Yu Hsu", "Shao-Syuan Huang", "Lee Chen Wei", "Hsi-Che Lin",
      "Hsuan-Hao Lin", "Hsuan-Ting Lin", "Jian-Ren Lin", "Ting-Chun Liu", "Li-Chun Lu",
      "Tsung-Min Pai", "Ankita Pasad", "Shih-Yun Shan Kuan", "Suwon Shon", "Yuxun Tang",
      "Yun-Shao Tsai", "Jui-Chiang Wei", "Tzu-Chieh Wei", "Chengxi Wu", "Dien-Ruei Wu",
      "Chao-Han Huck Yang", "Chieh-Chi Yang", "Jia Qi Yip", "Shao-Xiang Yuan", "Vahid Noroozi",
      "Zhehuai Chen", "Haibin Wu", "Karen Livescu", "David Harwath", "Shinji Watanabe", "Hung-yi Lee"
    ],
    year: 2025,
    venue: "ICLR 2025",
    venueFull: "International Conference on Learning Representations (ICLR 2025)",
    type: "conference",
    topics: ["alm", "data"],
    citations: 89,
    links: {
      arxiv: "https://arxiv.org/abs/2411.05361",
      pdf: "https://arxiv.org/pdf/2411.05361",
    },
  },
  {
    id: "dfadd",
    title: "DFADD: The Diffusion and Flow-Matching Based Audio Deepfake Dataset",
    authors: [
      "Jiawei Du", "I-Ming Lin", "I-Hsiang Chiu", "Xuanjun Chen", "Haibin Wu", "Wenze Ren", "Yu Tsao",
      "Hung-yi Lee", "Jyh-Shing Roger Jang"
    ],
    year: 2024,
    venue: "SLT 2024",
    venueFull: "IEEE Spoken Language Technology Workshop (SLT 2024), pp. 921–928",
    type: "conference",
    topics: ["data"],
    citations: 45,
    links: {
      arxiv: "https://arxiv.org/abs/2409.08731",
      pdf: "https://arxiv.org/pdf/2409.08731",
    },
  },
  {
    id: "emo-codec",
    title: "EMO-Codec: An In-Depth Look at Emotion Preservation Capacity of Legacy and Neural Codec Models with Subjective and Objective Evaluations",
    authors: [
      "Wenze Ren", "Yi-Cheng Lin", "Huang-Cheng Chou", "Haibin Wu", "Yi-Chiao Wu", "Chi-Chun Lee",
      "Hung-yi Lee", "Yu Tsao"
    ],
    year: 2024,
    venue: "APSIPA ASC 2024",
    venueFull: "Asia Pacific Signal and Information Processing Association Annual Summit and Conference (APSIPA ASC 2024)",
    type: "conference",
    topics: ["assessment"],
    citations: 17,
    links: {
      arxiv: "https://arxiv.org/abs/2407.15458",
      pdf: "https://arxiv.org/pdf/2407.15458",
      doi: "https://doi.org/10.1109/APSIPAASC63619.2025.10849259",
    },
  },
  {
    id: "robust-avse",
    title: "Robust Audio-Visual Speech Enhancement: Correcting Misassignments in Complex Environments with Advanced Post-Processing",
    authors: [
      "Wenze Ren", "Kuo-Hsuan Hung", "Rong Chao", "You-Jin Li", "Hsin-Min Wang", "Yu Tsao"
    ],
    year: 2024,
    venue: "O-COCOSDA 2024",
    venueFull: "27th Conference of the Oriental COCOSDA (O-COCOSDA 2024)",
    type: "conference",
    topics: ["enhancement"],
    citations: 4,
    links: {
      arxiv: "https://arxiv.org/abs/2409.14554",
      pdf: "https://arxiv.org/pdf/2409.14554",
    },
  },
  {
    id: "mc-semamba",
    title: "MC-SEMamba: A Simple Multi-channel Extension of SEMamba",
    authors: [
      "Wen-Yuan Ting", "Wenze Ren", "Rong Chao", "Hsin-Yi Lin", "Yu Tsao", "Fan-Gang Zeng"
    ],
    year: 2024,
    venue: "arXiv 2024",
    venueFull: "arXiv preprint arXiv:2409.17898",
    type: "preprint",
    topics: ["enhancement"],
    citations: 3,
    links: {
      arxiv: "https://arxiv.org/abs/2409.17898",
      pdf: "https://arxiv.org/pdf/2409.17898",
    },
  },
  {
    id: "dcunet-conformer-avse",
    title: "Deep Complex U-Net with Conformer for Audio-Visual Speech Enhancement",
    authors: [
      "Shafique Ahmed", "Chia-Wei Chen", "Wenze Ren", "Chin-Jou Li", "Ernie Chu", "Jun-Cheng Chen",
      "Amir Hussain", "Hsin-Min Wang", "Yu Tsao", "Jen-Cheng Hou"
    ],
    year: 2023,
    venue: "arXiv 2023",
    venueFull: "arXiv preprint arXiv:2309.11059",
    type: "preprint",
    topics: ["enhancement"],
    citations: 11,
    links: {
      arxiv: "https://arxiv.org/abs/2309.11059",
      pdf: "https://arxiv.org/pdf/2309.11059",
    },
  },
];

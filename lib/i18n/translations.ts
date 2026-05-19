// ─── Language Type ────────────────────────────────────────────────────────────

export type Language = "en" | "id";

// ─── English Translations ─────────────────────────────────────────────────────

export const translationsEN: Record<string, string> = {
  // ── Navbar ──────────────────────────────────────────────────────────────────
  "nav.about":   "About",
  "nav.project": "Project",
  "nav.contact": "Contact",

  // ── Hero (Home) ─────────────────────────────────────────────────────────────
  "hero.bio":   "I craft fast, beautiful digital experiences — from concept to code.",
  "hero.im":    "I'm a",
  "hero.role1": "Students.",
  "hero.role2": "UI/UX Designer.",
  "hero.role3": "Software Engineer.",
  "hero.role4": "Creative Coder.",
  "hero.role5": "Prompt Engineer.",
  "hero.location": "Based in Indonesia",
  "hero.scroll":   "Scroll",

  // ── Stats (Home) ─────────────────────────────────────────────────────────────
  "stats.projects.label": "Projects Delivered",
  "stats.projects.sub":   "Production-ready",
  "stats.ai.label":       "Powered Workflow",
  "stats.ai.sub":         "Antrigravity + Claude",
  "stats.stack.label":    "Technologies Learned",
  "stats.stack.sub":      "DevOps · HTML · Figma · more",
  "stats.passion.label":  "Passion for Craft",
  "stats.passion.sub":    "Always learning, always building",

  // ── What I Do (Home) ─────────────────────────────────────────────────────────
  "whatido.title":           "What I Do",
  "whatido.subtitle":        "From pixel-perfect interfaces to full-stack systems — here's how I can help.",
  "whatido.frontend.title":  "Frontend Development",
  "whatido.frontend.desc":   "Crafting fast, accessible, and visually polished web interfaces using Next.js, React, TypeScript, and Tailwind CSS.",
  "whatido.design.title":    "UI/UX Design",
  "whatido.design.desc":     "Designing intuitive user experiences and clean visual systems in Figma — from wireframes to production-ready design.",
  "whatido.creative.title":  "Creative Coding",
  "whatido.creative.desc":   "Bringing ideas to life with motion design, 3D visuals, and interactive experiences using Framer Motion and Blender.",
  "hero.cta.work":           "See My Work",
  "hero.cta.contact":        "Get in Touch",
  "hero.open":               "Open to Work",

  // ── Featured Projects (Home) ─────────────────────────────────────────────────
  "projects.title":      "Featured Projects",
  "projects.subtitle":   "A selection of work spanning branding, web development, and motion design.",
  "project.marbas.desc": "E-commerce website — design with Indonesian heritage values. Branding, premium Indonesian perfume, and comfortable shopping experience.",
  "project.lumidh.desc": "Premium perfume e-commerce with elegant appearance — signature scents collection with luxurious shopping experience.",
  "project.adria.desc":  "Graphic design studio — breathing design for your brand. Branding, visual content, and visual identity.",

  // ── Certificates (Home) ──────────────────────────────────────────────────────
  "certificates.title":    "Certificates",
  "certificates.subtitle": "Continuous learning — verified credentials from trusted platforms.",
  "cert.web.title":      "Dasar AI",
  "cert.frontend.title": "Financial Literacy",
  "cert.uiux.title":       "UI/UX Design Fundamentals",
  "cert.js.title":         "JavaScript Algorithms",

  // ── About Page ───────────────────────────────────────────────────────────────
  "about.title":           "About Me",
  "about.bio.p1":          "Hi, I'm Kahfiya Nur Gunami — a passionate software engineering student from Banjarmasin, Indonesia. I love crafting clean, performant web experiences that blend thoughtful design with solid engineering.",
  "about.bio.p2":          "My journey started with curiosity about how websites work, and it quickly grew into a deep interest in frontend development, UI/UX design, and modern JavaScript ecosystems.",
  "about.bio.p3":          "When I'm not coding, you'll find me exploring design tools, learning new technologies, or sketching out the next project idea.",
  "about.education.title": "Education Journey",
  "about.skills.title":    "Skills",

  // PPLG Competencies
  "pplg.title":            "PPLG Competencies",
  "pplg.subtitle":         "Core competencies studied in the Software & Game Development (PPLG) program at SMKN 2 Banjarmasin.",
  "pplg.casing3d.title":        "3D Casing Panel-P10",
  "pplg.casing3d.desc":         "Building websites from scratch using HTML, CSS, JavaScript, and modern frameworks like Next.js and React.",
  "pplg.sysop.title":         "Sistem Operasi",
  "pplg.sysop.desc":          "Designing and managing relational databases using MySQL and PostgreSQL, including queries and data modeling.",
  "pplg.uiux.title":       "Desain UI/UX",
  "pplg.uiux.desc":        "Creating user-centered interfaces and prototypes using Figma — from wireframes to high-fidelity mockups.",
  "pplg.algo1.title":       "Algoritma & Pemrograman",
  "pplg.algo1.desc":        "Solving problems with structured logic using Python, C++, and C# — covering data structures and OOP.",
  "pplg.algo2.title":        "Algoritma & Pemrograman",
  "pplg.algo2.desc":         "Understanding network fundamentals, IP addressing, protocols, and basic server configuration.",
  "pplg.brosur.title":       "Brosur Penjualan",
  "pplg.brosur.desc":        "Introduction to game design concepts, 2D/3D asset creation, and game logic using Blender and basic engines.",

  // Education timeline entries
  "edu.smp.title":       "SMPN 8 Banjarmasin",
  "edu.smp.subtitle":    "Junior High School",
  "edu.smp.period":      "2021 – 2024",
  "edu.smp.description": "Completed junior high school education with a focus on natural sciences and mathematics. This is where curiosity about technology and computers first began to grow.",
  "edu.smp.tag1":        "Arts & Culture",
  "edu.smp.tag2":        "Local Content",
  "edu.smp.tag3":        "Basic Computing",
  "edu.smp.tag4":        "Indonesian Language",

  "edu.smk.title":        "SMKN 2 Banjarmasin",
  "edu.smk.subtitle":     "Software & Game Development (PPLG)",
  "edu.smk.period":       "2025 – Present",
  "edu.smk.description":  "Continuing education at a vocational high school majoring in Software & Game Development (PPLG). Studying programming, web development, databases, and UI/UX design intensively — the foundation of everything being built today.",
  "edu.smk.achievement1": "✅ Learned HTML, CSS, Python from scratch",
  "edu.smk.achievement2": "✅ Built first web project",
  "edu.smk.achievement3": "✅ Mastered Figma for UI design",
  "edu.smk.achievement4": "✅ Industrial work practice (PKL)",

  // Skill labels (human-readable only; tech names stay in EN)
  "skill.publicspeaking": "Public Speaking",
  "skill.3dartist":       "3D Artist",
  "skill.devops":         "DevOps Engineer",

  // ── Work Page ────────────────────────────────────────────────────────────────
  "work.title":             "My Projects",
  "work.filter.all":        "All",
  "work.filter.design":     "Design",
  "work.proj.adria.desc":   "Graphic design studio website — breathing design for your brand. Branding, visual content, and visual identity.",
  "work.proj.lumidh.desc":  "Premium perfume e-commerce with elegant appearance — Oud Wood Essence, Night Dance, and other signature scents collections.",
  "work.proj.marbas.desc":  "E-commerce website — Indonesian heritage in a modern touch. Exclusive collection of perfumes, clothing, and technology inspired by Nusantara culture.",
  "work.proj.mantles.desc": "Fashion e-commerce — minimal forms, considered materials. A wardrobe built to endure. Fall/Winter collection with editorial aesthetic.",
  "work.proj.birthday.desc": "An interactive birthday gift — a heartfelt digital love letter with animated hearts, music, and a personal message crafted with care.",
  "work.proj.rumah.desc":    "IPAS school assignment — a 3D architectural visualization of a house model built as part of the curriculum.",
  "work.proj.panel.desc":   "P10 LED panel display project — hardware assembly and configuration of an outdoor LED matrix panel for digital signage.",

  // ── Contact Page ─────────────────────────────────────────────────────────────
  "contact.subtitle":      "Get in touch",
  "contact.heading1":      "Let's Build",
  "contact.heading2":      "Something Great.",
  "contact.intro":         "Have an interesting project? Or just want to chat about ideas? I'm always open to new collaborations.",
  "contact.socials.label": "Contact",
  "contact.cta":           "Send Message →",

  // ── Contact Form ─────────────────────────────────────────────────────────────
  "form.name.placeholder":    "Name",
  "form.email.placeholder":   "Email",
  "form.message.placeholder": "Message",
  "form.submit":              "Send Message",
  "form.submitting":          "Sending...",
  "form.success.heading":     "Message sent!",
  "form.success.body":        "I'll get back to you as soon as possible.",
  "form.error.name":          "Name is required.",
  "form.error.email":         "Please enter a valid email.",
  "form.error.message":       "Message must be at least 10 characters.",
};

// ─── Indonesian Translations ──────────────────────────────────────────────────

export const translationsID: Record<string, string> = {
  // ── Navbar ──────────────────────────────────────────────────────────────────
  "nav.about":   "Tentang",
  "nav.project": "Proyek",
  "nav.contact": "Kontak",

  // ── Hero (Home) ─────────────────────────────────────────────────────────────
  "hero.bio":   "Saya membangun pengalaman digital yang cepat dan indah — dari konsep hingga kode.",
  "hero.im":    "Saya seorang",
  "hero.role1": "Fullstack Developer.",
  "hero.role2": "UI/UX Designer.",
  "hero.role3": "Software Engineer.",
  "hero.role4": "Creative Coder.",
  "hero.role5": "Prompt Engineer.",
  "hero.location": "Berbasis di Indonesia",
  "hero.scroll":   "Gulir",

  // ── Stats (Home) ─────────────────────────────────────────────────────────────
  "stats.projects.label": "Proyek Selesai",
  "stats.projects.sub":   "Siap produksi",
  "stats.ai.label":       "Alur Kerja Bertenaga AI",
  "stats.ai.sub":         "Antigravity + Claude",
  "stats.stack.label":    "Mempelajari Teknologi",
  "stats.stack.sub":      "DevOps · HTML · Figma · dan lainnya",
  "stats.passion.label":  "Semangat Berkarya",
  "stats.passion.sub":    "Selalu belajar, selalu membangun",

  // ── What I Do (Home) ─────────────────────────────────────────────────────────
  "whatido.title":           "Yang Saya Lakukan",
  "whatido.subtitle":        "Dari antarmuka yang sempurna hingga sistem full-stack — begini cara saya bisa membantu.",
  "whatido.frontend.title":  "Frontend Development",
  "whatido.frontend.desc":   "Membangun antarmuka web yang cepat, aksesibel, dan indah menggunakan Next.js, React, TypeScript, dan Tailwind CSS.",
  "whatido.design.title":    "UI/UX Design",
  "whatido.design.desc":     "Merancang pengalaman pengguna yang intuitif dan sistem visual yang bersih di Figma — dari wireframe hingga desain siap produksi.",
  "whatido.creative.title":  "Creative Coding",
  "whatido.creative.desc":   "Menghidupkan ide dengan motion design, visual 3D, dan pengalaman interaktif menggunakan Framer Motion dan Blender.",
  "hero.cta.work":           "Lihat Proyek",
  "hero.cta.contact":        "Hubungi Saya",
  "hero.open":               "Tersedia untuk Kerja",

  // ── Featured Projects (Home) ─────────────────────────────────────────────────
  "projects.title":      "Proyek Unggulan",
  "projects.subtitle":   "Pilihan karya yang mencakup branding, pengembangan web, dan desain motion.",
  "project.marbas.desc": "Website e-commerce — desain yang memiliki nilai nusantara. Branding, parfum premium khas nusantara, dan pengalaman belanja yang nyaman.",
  "project.lumidh.desc": "E-commerce parfum premium dengan tampilan elegan — koleksi signature scents dengan pengalaman belanja yang mewah.",
  "project.adria.desc":  "Studio desain grafis — desain yang bernapas untuk brand Anda. Branding, konten visual, dan identitas visual.",

  // ── Certificates (Home) ──────────────────────────────────────────────────────
  "certificates.title":    "Sertifikat",
  "certificates.subtitle": "Pembelajaran berkelanjutan — kredensial terverifikasi dari platform terpercaya.",
  "cert.web.title":      "Dasar AI",
  "cert.frontend.title": "Financial Literacy",
  "cert.uiux.title":       "UI/UX Design Fundamentals",
  "cert.js.title":         "JavaScript Algorithms",

  // ── About Page ───────────────────────────────────────────────────────────────
  "about.title":           "Tentang Saya",
  "about.bio.p1":          "Halo, saya Kahfiya Nur Gunami — seorang siswa pengembangan perangkat lunak & gim yang bersemangat dari Banjarmasin, Indonesia. Saya suka membuat pengalaman web yang bersih dan berperforma tinggi yang memadukan desain yang bijaksana dengan rekayasa yang solid.",
  "about.bio.p2":          "Perjalanan saya dimulai dengan rasa ingin tahu tentang cara kerja website, dan dengan cepat berkembang menjadi minat mendalam pada pengembangan frontend, desain UI/UX, dan ekosistem JavaScript modern.",
  "about.bio.p3":          "Ketika tidak sedang coding, saya biasanya menjelajahi alat desain, mempelajari teknologi baru, atau merancang ide proyek berikutnya.",
  "about.education.title": "Perjalanan Pendidikan",
  "about.skills.title":    "Keahlian",

  // PPLG Competencies
  "pplg.title":            "Keahlian PPLG",
  "pplg.subtitle":         "Keahlian yang dipelajari dalam program Pengembangan Perangkat Lunak & Gim (PPLG) di SMKN 2 Banjarmasin.",
  "pplg.casing3d.title":        "3D Casing Panel-P10",
  "pplg.casing3d.desc":         "Desain dan pembuatan casing 3D bergaya retro untuk display LED P10 dengan fitur jam digital real-time.",
  "pplg.sysop.title":         "Sistem Operasi",
  "pplg.sysop.desc":          "Praktik dasar sistem operasi: navigasi file, manajemen folder, dan perintah CLI di Windows PowerShell.",
  "pplg.uiux.title":       "Desain UI/UX",
  "pplg.uiux.desc":        "Prototipe desain antarmuka aplikasi mobile dengan fokus pada pengaturan waktu dan tema visual modern.",
  "pplg.algo1.title":       "Algoritma & Pemrograman",
  "pplg.algo1.desc":        "Belajar dasar-dasar coding: membuat program sederhana dengan Python, memahami variabel, if-else, loop, dan fungsi untuk menyelesaikan masalah sehari-hari.",
  "pplg.algo2.title":        "Flowchart",
  "pplg.algo2.desc":         "Flowchart sistem alarm clock: inisialisasi komponen, tampilkan waktu real-time, dan putar suara otomatis saat mencapai waktu yang ditentukan.",
  "pplg.brosur.title":       "Brosur Penjualan",
  "pplg.brosur.desc":        "Desain brosur produk digital dengan layout menarik, penekanan keunggulan, dan call-to-action jelas.",

  // Education timeline entries
  "edu.smp.title":       "SMPN 8 Banjarmasin",
  "edu.smp.subtitle":    "Sekolah Menengah Pertama",
  "edu.smp.period":      "2021 – 2024",
  "edu.smp.description": "Menempuh pendidikan Sekolah Menengah Pertama dengan fokus pada ilmu pengetahuan alam dan matematika. Di sinilah rasa ingin tahu terhadap teknologi dan komputer mulai tumbuh.",
  "edu.smp.tag1":        "Seni Budaya",
  "edu.smp.tag2":        "Mulok",
  "edu.smp.tag3":        "Komputer Dasar",
  "edu.smp.tag4":        "Bahasa Indonesia",

  "edu.smk.title":        "SMKN 2 Banjarmasin",
  "edu.smk.subtitle":     "Pengembangan Perangkat Lunak & Gim (PPLG)",
  "edu.smk.period":       "2025 – Sekarang",
  "edu.smk.description":  "Melanjutkan pendidikan di Sekolah Menengah Kejuruan jurusan Rekayasa Perangkat Lunak & Gim (PPLG). Belajar pemrograman, pengembangan web, basis data, dan desain UI/UX secara intensif — fondasi dari semua yang dibangun sekarang.",
  "edu.smk.achievement1": "✅ Belajar HTML, CSS, Python dari dasar",
  "edu.smk.achievement2": "✅ Membangun proyek web pertama",
  "edu.smk.achievement3": "✅ Menguasai Figma untuk desain UI",
  "edu.smk.achievement4": "✅ Praktik kerja industri (PKL)",

  // Skill labels (human-readable only; tech names stay in EN)
  "skill.publicspeaking": "Berbicara di Depan Umum",
  "skill.3dartist":       "Seniman 3D",
  "skill.devops":         "DevOps Engineer",

  // ── Work Page ────────────────────────────────────────────────────────────────
  "work.title":             "Proyek Saya",
  "work.filter.all":        "Semua",
  "work.filter.design":     "Desain",
  "work.proj.adria.desc":   "Website studio desain grafis — desain yang bernapas untuk brand Anda. Branding, konten visual, dan identitas visual.",
  "work.proj.lumidh.desc":  "E-commerce parfum premium dengan tampilan elegan — Oud Wood Essence, Night Dance, dan koleksi signature scents lainnya.",
  "work.proj.marbas.desc":  "Website e-commerce — warisan nusantara dalam sentuhan modern. Koleksi eksklusif parfum, pakaian, dan teknologi terinspirasi budaya Nusantara.",
  "work.proj.mantles.desc": "Fashion e-commerce — bentuk minimal, material terpilih. Lemari pakaian yang dibangun untuk bertahan. Koleksi Fall/Winter dengan estetika editorial.",
  "work.proj.birthday.desc": "Hadiah ulang tahun interaktif — surat cinta digital yang penuh perasaan dengan animasi hati, musik, dan pesan personal yang dibuat dengan sepenuh hati.",
  "work.proj.rumah.desc":    "Tugas IPAS sekolah — visualisasi arsitektur 3D model rumah yang dibuat sebagai bagian dari kurikulum.",
  "work.proj.panel.desc":   "Proyek panel LED P10 — perakitan hardware dan konfigurasi panel LED matrix outdoor untuk papan informasi digital.",

  // ── Contact Page ─────────────────────────────────────────────────────────────
  "contact.subtitle":      "Hubungi Saya",
  "contact.heading1":      "Mari Bangun",
  "contact.heading2":      "Sesuatu yang Hebat.",
  "contact.intro":         "Punya project menarik? Atau sekadar ingin ngobrol soal ide? Saya selalu terbuka untuk kolaborasi baru.",
  "contact.socials.label": "Kontak",
  "contact.cta":           "Kirim Pesan →",

  // ── Contact Form ─────────────────────────────────────────────────────────────
  "form.name.placeholder":    "Nama",
  "form.email.placeholder":   "Email",
  "form.message.placeholder": "Pesan",
  "form.submit":              "Kirim Pesan",
  "form.submitting":          "Mengirim...",
  "form.success.heading":     "Pesan terkirim!",
  "form.success.body":        "Saya akan membalas secepatnya.",
  "form.error.name":          "Nama wajib diisi.",
  "form.error.email":         "Masukkan email yang valid.",
  "form.error.message":       "Pesan minimal 10 karakter.",
};

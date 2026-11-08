// ===== Data skill: ubah level (0-100) dan label sesuai kemampuanmu =====
const SKILLS = [
  {name:"Python", icon:"python", level:70, label:"Intermediate"},
  {name:"PostgreSQL", icon:"postgresql", level:65, label:"Intermediate"},
  {name:"MongoDB", icon:"mongodb", level:50, label:"Beginner"},
  {name:"Cisco", icon:"cisco", level:70, label:"Intermediate"},
  {name:"Tableau", icon:"tableau", level:60, label:"Intermediate"},
  {name:"HTML + CSS", icon:"html5", level:65, label:"Intermediate"},
  {name:"Figma", icon:"figma", level:50, label:"Beginner"},
  {name:"Microsoft Office", icon:"microsoftoffice", level:85, label:"Advanced"}
];
// ===== Data project: images = daftar gambar di folder img/, detail = paragraf deskripsi =====
const PROJECTS = [
  {title:"Klasifikasi Keamanan Lalu Lintas Jaringan", desc:"Tugas akhir/skripsi: klasifikasi lalu lintas jaringan dengan Random Forest Classifier.", images:["img/skripsi-1.jpg","img/skripsi-2.jpg","img/skripsi-3.jpg","img/skripsi-4.jpg","img/skripsi-5.jpg","img/skripsi-6.jpg"], detail:["Tugas akhir/skripsi S1 Informatika Universitas Gunadarma tentang klasifikasi keamanan lalu lintas jaringan menggunakan algoritma Random Forest Classifier."], tags:["Python","Machine Learning","Network Security"], link:""},
  {title:"Game 2D Android dengan Godot Engine", desc:"Penulisan ilmiah: pembuatan aplikasi game 2D berbasis Android.", images:["img/game-1.jpg","img/game-2.jpg","img/game-3.jpg"], detail:["Penulisan ilmiah di Universitas Gunadarma tentang pembuatan aplikasi game 2D berbasis Android dengan menggunakan Godot Engine.","Game yang dibuat bernama Koin Jumper, game 2 dimensi dengan tujuan mengumpulkan poin di setiap level. Terdapat 4 level yang bebas dipilih pemain, dan setiap level memiliki rintangannya masing-masing.","Di setiap level terdapat buah yang berfungsi sebagai koin penentu skor, serta objek piala untuk berpindah level. Pemain mengontrol karakter lewat tombol di layar (kiri, kanan, dan lompat), dan skor ditampilkan selama bermain."], tags:["Godot","Android","Game Dev"], link:""}
];
// ===== Data sertifikat: taruh PDF di folder sertifikat/ =====
const LPK = "Lembaga Pengembangan Komputerisasi Universitas Gunadarma";
const CERTS = [
  {g:"sertifikasi", title:"Memulai Pemrograman dengan Python", issuer:"Dicoding Indonesia", date:"Juni 2025 - Juni 2028", file:"sertifikat/python-dicoding.pdf"},
  {g:"sertifikasi", title:"Belajar Dasar Visualisasi Data", issuer:"Dicoding Indonesia", date:"Oktober 2025 - Oktober 2028", file:"sertifikat/visualisasi-data-dicoding.pdf"},
  {g:"sertifikasi", title:"Introduction to Cybersecurity", issuer:"Cisco Networking Academy", date:"April 2026", file:"sertifikat/cisco-cybersecurity.pdf"},
  {g:"pelatihan", title:"Fundamental Networking", issuer:LPK, date:"Agustus 2022", file:"sertifikat/fundamental-networking.pdf"},
  {g:"pelatihan", title:"Go-Lang for Beginner", issuer:LPK, date:"Februari 2023", file:"sertifikat/golang.pdf"},
  {g:"pelatihan", title:"Local Area Network Using Cisco Router", issuer:LPK, date:"Agustus 2023", file:"sertifikat/lan-cisco-router.pdf"},
  {g:"pelatihan", title:"JavaScript Programming Language Fundamental", issuer:LPK, date:"Februari 2024", file:"sertifikat/javascript.pdf"},
  {g:"pelatihan", title:"Wide Area Network Using Cisco Router for Intermediate", issuer:LPK, date:"Agustus 2024", file:"sertifikat/wan-cisco-router.pdf"},
  {g:"pelatihan", title:"Network Design and Configuration Using Switch Device", issuer:LPK, date:"23 - 28 September 2024", file:"sertifikat/network-switch.pdf"},
  {g:"pelatihan", title:"Local Area Network Design and Configuration", issuer:LPK, date:"27 Mei - 14 Juni 2025", file:"sertifikat/lan-design.pdf"}
];

const $ = s => document.querySelector(s);
const PH = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><rect width="640" height="360" fill="#13233a"/><text x="320" y="185" fill="#93a5bd" font-family="sans-serif" font-size="22" text-anchor="middle">Gambar menyusul</text></svg>');
$("#skills").innerHTML = SKILLS.map(s => `
  <div class="skill"><div class="skill-top">
    <img src="https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/${s.icon}.svg" alt="" loading="lazy">
    <strong>${s.name}</strong><span class="badge">${s.label}</span></div>
    <div class="bar" role="progressbar" aria-valuenow="${s.level}" aria-valuemin="0" aria-valuemax="100" aria-label="${s.name}"><i data-w="${s.level}"></i></div>
  </div>`).join("");

// Foto profil: coba beberapa nama file
const FOTO = ["foto.jpg","foto.jpeg","foto.JPG","foto.JPEG","foto.png"];
const fi = $("#foto"); let fk = 0;
fi.onerror = () => { if(++fk < FOTO.length) fi.src = FOTO[fk]; else fi.replaceWith(Object.assign(document.createElement("span"),{textContent:"FF"})); };
fi.src = FOTO[0];

// Modal umum
const modal = $("#modal");
function openModal(title, node, onKey){
  $("#mtitle").textContent = title; $("#mbody").replaceChildren(node); modal._key = onKey;
  applyLang(modal); modal.hidden = false; document.body.style.overflow = "hidden"; modal.querySelector(".mclose").focus();
}
function closeModal(){ modal.hidden = true; $("#mbody").replaceChildren(); document.body.style.overflow = ""; }
modal.addEventListener("click", e => { if(e.target === modal || e.target.closest(".mclose")) closeModal(); });
addEventListener("keydown", e => { if(modal.hidden) return; if(e.key === "Escape") closeModal(); else if(modal._key) modal._key(e); });

// Project: kartu + galeri
$("#projects").innerHTML = PROJECTS.map((p,i) => `
  <button class="project" data-i="${i}"><div class="thumb"><img src="${p.images[0]}" alt="${p.title}" onerror="this.src=PH"></div>
  <div class="pbody"><h3>${p.title}</h3><p>${p.desc}</p>
  <div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div></div></button>`).join("");
$("#projects").addEventListener("click", e => { const b = e.target.closest(".project"); if(b) openProject(PROJECTS[b.dataset.i]); });
function openProject(p){
  const w = document.createElement("div"); let i = 0;
  w.innerHTML = `<div class="gal"><button class="nav-b prev" aria-label="Gambar sebelumnya">&lsaquo;</button><img alt="${p.title}"><button class="nav-b next" aria-label="Gambar berikutnya">&rsaquo;</button></div>
    <div class="thumbs">${p.images.map((s,k)=>`<img src="${s}" alt="Gambar ${k+1}" data-k="${k}" onerror="this.src=PH">`).join("")}</div>
    <div class="detail">${p.detail.map(t=>`<p>${t}</p>`).join("")}<div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div>
    ${p.link?`<p style="margin-top:1rem"><a class="btn primary" href="${p.link}" target="_blank" rel="noopener">Buka project</a></p>`:""}</div>`;
  const main = w.querySelector(".gal>img"), th = [...w.querySelectorAll(".thumbs img")];
  const show = n => { i = (n + p.images.length) % p.images.length; main.src = p.images[i]; main.onerror = () => { main.onerror = null; main.src = PH; }; th.forEach((t,k)=>t.classList.toggle("on",k===i)); };
  w.querySelector(".prev").onclick = () => show(i-1); w.querySelector(".next").onclick = () => show(i+1);
  th.forEach(t => t.onclick = () => show(+t.dataset.k));
  openModal(p.title, w, e => { if(e.key==="ArrowLeft") show(i-1); if(e.key==="ArrowRight") show(i+1); });
  show(0);
}

// Sertifikat: PDF ditampilkan sebagai gambar memakai PDF.js
const PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/";
const pdfReady = new Promise(res => { const t = document.createElement("script"); t.src = PDFJS + "pdf.min.js";
  t.onload = () => { pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS + "pdf.worker.min.js"; res(true); }; t.onerror = () => res(false); document.head.appendChild(t); });
const docs = {};
async function renderPdf(file, canvas, width, page = 1){
  if(!await pdfReady) throw new Error("pdfjs");
  const pdf = await (docs[file] ||= pdfjsLib.getDocument(file).promise);
  const pg = await pdf.getPage(page), v0 = pg.getViewport({scale:1});
  const v = pg.getViewport({scale: width / v0.width});
  canvas.width = v.width; canvas.height = v.height;
  await pg.render({canvasContext: canvas.getContext("2d"), viewport: v}).promise;
  return pdf.numPages;
}
const isImg = f => /\.(jpe?g|png|webp)$/i.test(f);
const card = (c,i) => `<button class="ccard" data-i="${i}"><div class="cthumb"><canvas></canvas></div><strong>${c.title}</strong><span>${c.issuer}</span><small>${c.date}</small></button>`;
["sertifikasi","pelatihan"].forEach(g => {
  const box = $("#certs-" + g);
  box.innerHTML = CERTS.map((c,i) => c.g === g ? card(c,i) : "").join("");
  box.addEventListener("click", e => { const b = e.target.closest(".ccard"); if(b) openCert(CERTS[b.dataset.i]); });
});
document.querySelectorAll(".ccard").forEach(b => {
  const c = CERTS[b.dataset.i], box = b.querySelector(".cthumb");
  if(isImg(c.file)){ box.innerHTML = `<img src="${c.file}" alt="${c.title}" loading="lazy">`; box.querySelector("img").onerror = () => { box.textContent = "Sertifikat menyusul"; applyLang(box); }; return; }
  renderPdf(c.file, box.querySelector("canvas"), 420).catch(() => { box.textContent = "Sertifikat menyusul"; applyLang(box); });
});
async function openCert(c){
  const w = document.createElement("div"); w.className = "certview";
  if(isImg(c.file)){
    w.innerHTML = `<img src="${c.file}" alt="${c.title}">`;
    w.querySelector("img").onerror = () => { w.innerHTML = `<p class="muted">${T("Sertifikat belum bisa ditampilkan. Pastikan file "+c.file+" sudah diunggah.","The certificate cannot be displayed. Make sure "+c.file+" has been uploaded.")}</p>`; };
    openModal(c.title, w); return;
  }
  w.innerHTML = `<canvas></canvas><div class="pager" hidden><button class="btn prev2">Sebelumnya</button><span></span><button class="btn next2">Berikutnya</button></div>`;
  openModal(c.title, w);
  const can = w.querySelector("canvas"), pg = w.querySelector(".pager"); let n = 1, total = 1;
  const draw = async () => { total = await renderPdf(c.file, can, 1400, n); pg.hidden = total < 2; pg.querySelector("span").textContent = n + " / " + total; };
  w.querySelector(".prev2").onclick = () => { if(n > 1){ n--; draw(); } };
  w.querySelector(".next2").onclick = () => { if(n < total){ n++; draw(); } };
  try { await draw(); } catch { w.innerHTML = `<p class="muted">${T("Sertifikat belum bisa ditampilkan. Pastikan file "+c.file+" sudah diunggah dan web dibuka lewat GitHub Pages atau Live Server.","The certificate cannot be displayed. Make sure "+c.file+" has been uploaded and the site is opened via GitHub Pages or Live Server.")}</p>`; }
}

// Efek ketik pada role
const roles = ["IT Operations", "IT Infrastructure", "Data Analyst", "Network Engineering"];
let ri = 0, ci = 0, del = false;
(function type(){
  const w = roles[ri];
  $("#typed").textContent = w.slice(0, ci += del ? -1 : 1);
  let t = del ? 40 : 90;
  if(!del && ci === w.length){ del = true; t = 1400; }
  else if(del && ci === 0){ del = false; ri = (ri+1) % roles.length; t = 300; }
  setTimeout(type, t);
})();

// Reveal saat scroll + bar skill + hitung angka
const io = new IntersectionObserver(es => es.forEach(e => {
  if(!e.isIntersecting) return;
  e.target.classList.add("show");
  e.target.querySelectorAll(".bar i").forEach(i => i.style.width = i.dataset.w + "%");
  e.target.querySelectorAll("[data-count]").forEach(el => {
    const end = +el.dataset.count, dec = +(el.dataset.dec||0), t0 = performance.now();
    const step = t => { const k = Math.min((t-t0)/1200,1); el.textContent = (end*k).toFixed(dec); if(k<1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
  io.unobserve(e.target);
}), {threshold:.15});
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Latar jaringan: node terhubung dengan paket data yang bergerak
const cv = $("#net"), cx = cv.getContext("2d");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let W, H, nodes = [], packets = [];
function size(){
  W = cv.width = innerWidth; H = cv.height = innerHeight;
  const n = Math.min(60, Math.floor(W*H/22000));
  nodes = Array.from({length:n}, () => ({x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25}));
}
function frame(){
  cx.clearRect(0,0,W,H);
  nodes.forEach(a => { a.x += a.vx; a.y += a.vy; if(a.x<0||a.x>W) a.vx*=-1; if(a.y<0||a.y>H) a.vy*=-1; });
  const links = [];
  for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){
    const a=nodes[i], b=nodes[j], d=Math.hypot(a.x-b.x,a.y-b.y);
    if(d<150){ links.push([a,b]); cx.strokeStyle=`rgba(91,192,255,${.25*(1-d/150)})`; cx.beginPath(); cx.moveTo(a.x,a.y); cx.lineTo(b.x,b.y); cx.stroke(); }
  }
  nodes.forEach(a => { cx.fillStyle="#5bc0ff"; cx.beginPath(); cx.arc(a.x,a.y,2,0,7); cx.fill(); });
  if(links.length && Math.random()<.05) packets.push({l:links[Math.random()*links.length|0], t:0});
  packets = packets.filter(p => p.t < 1);
  packets.forEach(p => { p.t += .02; const [a,b]=p.l; cx.fillStyle="#ffb454"; cx.beginPath(); cx.arc(a.x+(b.x-a.x)*p.t, a.y+(b.y-a.y)*p.t, 3, 0, 7); cx.fill(); });
  if(!reduce) requestAnimationFrame(frame);
}
addEventListener("resize", size); size(); frame();

// ===== Bahasa ID/EN =====
// Kunci = teks Indonesia persis seperti di halaman, nilai = terjemahan Inggris. Tambahkan pasangan baru di sini kalau kamu menambah teks.
const EN = {
  "Tentang":"About","Pengalaman":"Experience","Sertifikat":"Certificates","Kontak":"Contact","Project":"Projects",
  "Halo, saya":"Hi, I'm",
  "Fresh graduate Informatika dari Universitas Gunadarma dengan pengalaman magang di Divisi IT Operations, Unit System Management PT Bursa Efek Indonesia. Memiliki ketertarikan pada bidang Data Analyst, IT Operations, dan Network Engineering. Saat ini saya sedang magang di IT Infrastruktur PT Bank Mandiri (Persero) Tbk.":"Informatics fresh graduate from Gunadarma University with internship experience in the IT Operations Division, System Management Unit at PT Bursa Efek Indonesia. Interested in Data Analyst, IT Operations, and Network Engineering. I am currently interning in IT Infrastructure at PT Bank Mandiri (Persero) Tbk.",
  "Lihat project":"View projects","Unduh CV":"Download CV",
  "Tentang saya":"About me",
  "Berpengalaman dalam konfigurasi perangkat, migrasi data, pengelolaan aset TI, dokumentasi operasional, serta koordinasi dengan vendor. Menguasai Python, PostgreSQL, MongoDB, Cisco, Tableau, Figma, dan Microsoft Office.":"Experienced in device configuration, data migration, IT asset management, operational documentation, and vendor coordination. Proficient in Python, PostgreSQL, MongoDB, Cisco, Tableau, Figma, and Microsoft Office.",
  "Memiliki kemampuan komunikasi yang baik, mampu bekerja secara individu maupun tim, serta cepat beradaptasi dengan lingkungan kerja profesional. Saat ini saya magang di IT Infrastruktur (Endpoint Management) PT Bank Mandiri (Persero) Tbk.":"Good communication skills, able to work both individually and in a team, and quick to adapt to a professional work environment. I am currently interning in IT Infrastructure (Endpoint Management) at PT Bank Mandiri (Persero) Tbk.",
  "IPK S1 Informatika":"GPA, B.Sc. Informatics","Perusahaan tempat magang":"Internship companies","Pelatihan jaringan dan pemrograman":"Networking and programming trainings",
  "Agustus 2026 - saat ini":"August 2026 - present","April 2026 - Agustus 2026":"April 2026 - August 2026",
  "IT Infrastruktur (Endpoint Management), magang":"IT Infrastructure (Endpoint Management), Intern",
  "IT Operations (System Management), magang":"IT Operations (System Management), Intern",
  "Melakukan validasi dan pendataan perangkat CCTV pada kantor cabang, termasuk pemeriksaan MAC Address, jumlah kamera aktif dan nonaktif, konfigurasi SNTP/email, status perekaman, serta kondisi HDD.":"Validated and recorded CCTV devices at branch offices, including checking MAC addresses, the number of active and inactive cameras, SNTP/email configuration, recording status, and HDD condition.",
  "Melakukan pengecekan konfigurasi dan kondisi perangkat CCTV melalui aplikasi monitoring, termasuk pemeriksaan playback, sinkronisasi waktu, serta identifikasi kendala konektivitas perangkat.":"Checked CCTV device configuration and condition through a monitoring application, including playback checks, time synchronization, and identifying device connectivity issues.",
  "Mengidentifikasi jenis perangkat perekam CCTV yang digunakan pada kantor cabang, baik Digital Video Recorder (DVR) maupun Network Video Recorder (NVR).":"Identified the type of CCTV recorder used at branch offices, either Digital Video Recorder (DVR) or Network Video Recorder (NVR).",
  "Melakukan pengolahan dan validasi data CCTV berdasarkan wilayah operasional (region), termasuk penyelesaian pendataan CCTV Region 6.":"Processed and validated CCTV data by operational region, including completing the CCTV data collection for Region 6.",
  "Mengeksplorasi fitur Ivanti LANDESK Desktop Management, khususnya fitur Inventory untuk mempelajari pengelolaan inventaris perangkat endpoint.":"Explored Ivanti LANDESK Desktop Management features, especially Inventory, to learn how endpoint device inventory is managed.",
  "Mempelajari fungsi dan alur pengelolaan perangkat endpoint melalui LANDESK serta mengenal solusi Mobile Device Management (MDM) menggunakan MobileIron.":"Learned the functions and workflow of endpoint device management through LANDESK and became familiar with Mobile Device Management (MDM) using MobileIron.",
  "Menyiapkan dan melakukan konfigurasi perangkat laptop baru untuk mendukung kebutuhan operasional pengguna.":"Prepared and configured new laptops to support users' operational needs.",
  "Membantu proses migrasi data dan akun kerja pengguna dari perangkat lama ke perangkat baru.":"Assisted in migrating users' data and work accounts from old devices to new ones.",
  "Menyusun dokumentasi dan panduan terkait proses peremajaan perangkat laptop.":"Wrote documentation and guides for the laptop refresh process.",
  "Melakukan instalasi ulang (re-imaging) perangkat lama setelah proses migrasi data selesai dilakukan.":"Re-imaged old devices after data migration was completed.",
  "Mendukung pengelolaan aset teknologi informasi, termasuk identifikasi dan pemantauan perangkat pada area buffer stock gudang.":"Supported IT asset management, including identifying and monitoring devices in the warehouse buffer stock area.",
  "Melakukan pendataan dan pembaruan informasi aset IT yang berada di area gudang dan buffer stock.":"Recorded and updated information on IT assets located in the warehouse and buffer stock area.",
  "Menginput dan mengelola data hard disk disposal sebagai bagian dari proses penghapusan dan pengelolaan aset TI.":"Entered and managed hard disk disposal data as part of the IT asset disposal and management process.",
  "Melaksanakan proses degaussing pada hard disk untuk memastikan penghapusan data secara aman sesuai prosedur perusahaan.":"Performed degaussing on hard disks to ensure secure data erasure according to company procedures.",
  "Berkoordinasi dengan vendor melalui email terkait kegiatan preventive maintenance sistem dan aplikasi.":"Coordinated with vendors via email on preventive maintenance of systems and applications.",
  "Melakukan verifikasi serta memberikan masukan terhadap dokumen laporan maintenance yang dikirimkan vendor untuk memastikan kesesuaian dengan pelaksanaan kegiatan.":"Verified and gave feedback on maintenance reports submitted by vendors to ensure they matched the work performed.",
  "Membantu administrasi dan pencatatan aktivitas operasional yang berkaitan dengan pengelolaan perangkat dan aset teknologi informasi.":"Assisted with administration and recording of operational activities related to device and IT asset management.",
  "Pendidikan":"Education","S1 Informatika":"Bachelor of Informatics (S1)","Universitas Gunadarma":"Gunadarma University","2021 - 2025, IPK 3.73":"2021 - 2025, GPA 3.73",
  "Sertifikasi":"Certifications","Pelatihan":"Training",
  "Juni 2025 - Juni 2028":"June 2025 - June 2028","Oktober 2025 - Oktober 2028":"October 2025 - October 2028",
  "Agustus 2022":"August 2022","Februari 2023":"February 2023","Agustus 2023":"August 2023","Agustus 2024":"August 2024","Februari 2024":"February 2024","27 Mei - 14 Juni 2025":"27 May - 14 June 2025",
  "Klasifikasi Keamanan Lalu Lintas Jaringan":"Network Traffic Security Classification",
  "Tugas akhir/skripsi: klasifikasi lalu lintas jaringan dengan Random Forest Classifier.":"Final project/thesis: network traffic classification using a Random Forest Classifier.",
  "Tugas akhir/skripsi S1 Informatika Universitas Gunadarma tentang klasifikasi keamanan lalu lintas jaringan menggunakan algoritma Random Forest Classifier.":"Undergraduate thesis in Informatics at Gunadarma University on network traffic security classification using the Random Forest Classifier algorithm.",
  "Game yang dibuat bernama Koin Jumper, game 2 dimensi dengan tujuan mengumpulkan poin di setiap level. Terdapat 4 level yang bebas dipilih pemain, dan setiap level memiliki rintangannya masing-masing.":"The game is called Koin Jumper, a 2D game where the goal is to collect points in every level. There are 4 levels the player can freely choose from, and each level has its own obstacles.",
  "Di setiap level terdapat buah yang berfungsi sebagai koin penentu skor, serta objek piala untuk berpindah level. Pemain mengontrol karakter lewat tombol di layar (kiri, kanan, dan lompat), dan skor ditampilkan selama bermain.":"Each level has fruit that works as coins to determine the score, and a trophy object to move on to another level. The player controls the character with on-screen buttons (left, right, and jump), and the score is shown during play.",
  "Game 2D Android dengan Godot Engine":"2D Android Game with Godot Engine",
  "Penulisan ilmiah: pembuatan aplikasi game 2D berbasis Android.":"Scientific paper: building a 2D Android-based game application.",
  "Penulisan ilmiah di Universitas Gunadarma tentang pembuatan aplikasi game 2D berbasis Android dengan menggunakan Godot Engine.":"Scientific paper at Gunadarma University on building a 2D Android game application using the Godot Engine.",
  "Terbuka untuk peluang di IT Operations, Infrastruktur, Data Analyst, dan Network Engineering.":"Open to opportunities in IT Operations, Infrastructure, Data Analyst, and Network Engineering.",
  "Sebelumnya":"Previous","Berikutnya":"Next","Buka project":"Open project","Sertifikat menyusul":"Certificate coming soon"
};
let lang = "id"; try { if(localStorage.getItem("lang") === "en") lang = "en"; } catch {}
const T = (id, en) => lang === "en" ? en : id;
const orig = new WeakMap(), norm = s => s.replace(/\s+/g, " ").trim();
function applyLang(root = document.body){
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), list = [];
  while(w.nextNode()) list.push(w.currentNode);
  list.forEach(n => {
    if(/^(SCRIPT|STYLE)$/.test(n.parentElement?.tagName)) return;
    if(!orig.has(n)){ const k = norm(n.nodeValue); if(!EN[k]) return; orig.set(n, {raw:n.nodeValue, k}); }
    const o = orig.get(n); n.nodeValue = lang === "en" ? EN[o.k] : o.raw;
  });
}
function setLang(l){
  lang = l; try { localStorage.setItem("lang", l); } catch {}
  document.documentElement.lang = l;
  document.title = l === "en" ? "Farhan Fadillah | Portfolio" : "Farhan Fadillah | Portofolio";
  document.querySelectorAll("#lang b").forEach(b => b.classList.toggle("on", b.dataset.l === l));
  applyLang();
}
$("#lang").onclick = () => setLang(lang === "en" ? "id" : "en");
setLang(lang);

// ===== Menu menyala sesuai bagian yang sedang dilihat =====
(() => {
  const nav = document.querySelector(".nav nav"), links = [...nav.querySelectorAll("a")];
  const alias = {pendidikan: "sertifikat"};
  const setActive = id => {
    id = alias[id] || id;
    links.forEach(a => {
      const on = a.getAttribute("href") === "#" + id;
      a.classList.toggle("on", on);
      if(on){ a.setAttribute("aria-current", "true");
        if(nav.scrollWidth > nav.clientWidth) nav.scrollTo({left: a.offsetLeft - (nav.clientWidth - a.offsetWidth) / 2, behavior: "smooth"}); }
      else a.removeAttribute("aria-current");
    });
  };
  const spy = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting) setActive(e.target.id); }), {rootMargin: "-45% 0px -50% 0px"});
  document.querySelectorAll("main > section").forEach(s => spy.observe(s));
})();

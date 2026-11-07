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
  {title:"Klasifikasi Keamanan Lalu Lintas Jaringan", desc:"Tugas akhir/skripsi: klasifikasi lalu lintas jaringan dengan Random Forest Classifier.", images:["img/skripsi-1.jpg","img/skripsi-2.jpg"], detail:["Tugas akhir/skripsi S1 Informatika Universitas Gunadarma tentang klasifikasi keamanan lalu lintas jaringan menggunakan algoritma Random Forest Classifier."], tags:["Python","Machine Learning","Network Security"], link:""},
  {title:"Game 2D Android dengan Godot Engine", desc:"Penulisan ilmiah: pembuatan aplikasi game 2D berbasis Android.", images:["img/game-1.jpg","img/game-2.jpg"], detail:["Penulisan ilmiah di Universitas Gunadarma tentang pembuatan aplikasi game 2D berbasis Android dengan menggunakan Godot Engine."], tags:["Godot","Android","Game Dev"], link:""}
];
// ===== Data sertifikat: taruh PDF di folder sertifikat/ =====
const LPK = "Lembaga Pengembangan Komputerisasi Universitas Gunadarma";
const CERTS = [
  {g:"sertifikasi", title:"Memulai Pemrograman dengan Python", issuer:"Dicoding Indonesia", date:"Juni 2025 - Juni 2028", file:"sertifikat/python-dicoding.pdf"},
  {g:"sertifikasi", title:"Belajar Dasar Visualisasi Data", issuer:"Dicoding Indonesia", date:"Oktober 2025 - Oktober 2028", file:"sertifikat/visualisasi-data-dicoding.pdf"},
  {g:"pelatihan", title:"Fundamental Networking", issuer:LPK, date:"Agustus 2022", file:"sertifikat/fundamental-networking.pdf"},
  {g:"pelatihan", title:"Go-Lang for Beginner", issuer:LPK, date:"Februari 2023", file:"sertifikat/golang.pdf"},
  {g:"pelatihan", title:"Local Area Network Using Cisco Router", issuer:LPK, date:"Agustus 2023", file:"sertifikat/lan-cisco-router.pdf"},
  {g:"pelatihan", title:"JavaScript Programming Language Fundamental", issuer:LPK, date:"Februari 2024", file:"sertifikat/javascript.pdf"},
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
  modal.hidden = false; document.body.style.overflow = "hidden"; modal.querySelector(".mclose").focus();
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
const card = (c,i) => `<button class="ccard" data-i="${i}"><div class="cthumb"><canvas></canvas></div><strong>${c.title}</strong><span>${c.issuer}</span><small>${c.date}</small></button>`;
["sertifikasi","pelatihan"].forEach(g => {
  const box = $("#certs-" + g);
  box.innerHTML = CERTS.map((c,i) => c.g === g ? card(c,i) : "").join("");
  box.addEventListener("click", e => { const b = e.target.closest(".ccard"); if(b) openCert(CERTS[b.dataset.i]); });
});
document.querySelectorAll(".ccard").forEach(b => {
  const c = CERTS[b.dataset.i], box = b.querySelector(".cthumb");
  renderPdf(c.file, box.querySelector("canvas"), 420).catch(() => box.textContent = "Sertifikat menyusul");
});
async function openCert(c){
  const w = document.createElement("div"); w.className = "certview";
  w.innerHTML = `<canvas></canvas><div class="pager" hidden><button class="btn prev2">Sebelumnya</button><span></span><button class="btn next2">Berikutnya</button></div>`;
  openModal(c.title, w);
  const can = w.querySelector("canvas"), pg = w.querySelector(".pager"); let n = 1, total = 1;
  const draw = async () => { total = await renderPdf(c.file, can, 1400, n); pg.hidden = total < 2; pg.querySelector("span").textContent = n + " / " + total; };
  w.querySelector(".prev2").onclick = () => { if(n > 1){ n--; draw(); } };
  w.querySelector(".next2").onclick = () => { if(n < total){ n++; draw(); } };
  try { await draw(); } catch { w.innerHTML = `<p class="muted">Sertifikat belum bisa ditampilkan. Pastikan file ${c.file} sudah diunggah dan web dibuka lewat GitHub Pages atau Live Server.</p>`; }
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

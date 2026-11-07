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
// ===== Data project: isi image dengan nama file di folder img/ =====
const PROJECTS = [
  {title:"Klasifikasi Keamanan Lalu Lintas Jaringan", desc:"Tugas akhir/skripsi: klasifikasi lalu lintas jaringan menggunakan Random Forest Classifier.", image:"img/skripsi.jpg", tags:["Python","Machine Learning","Network Security"], link:""},
  {title:"Game 2D Android dengan Godot Engine", desc:"Penulisan ilmiah: pembuatan aplikasi game 2D berbasis Android menggunakan Godot Engine.", image:"img/game.jpg", tags:["Godot","Android","Game Dev"], link:""}
];

const $ = s => document.querySelector(s);
$("#skills").innerHTML = SKILLS.map(s => `
  <div class="skill"><div class="skill-top">
    <img src="https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/${s.icon}.svg" alt="" loading="lazy">
    <strong>${s.name}</strong><span class="badge">${s.label}</span></div>
    <div class="bar" role="progressbar" aria-valuenow="${s.level}" aria-valuemin="0" aria-valuemax="100" aria-label="${s.name}"><i data-w="${s.level}"></i></div>
  </div>`).join("");
$("#projects").innerHTML = PROJECTS.map(p => `
  <article class="project"><div class="thumb"><img src="${p.image}" alt="${p.title}" onerror="this.replaceWith('Gambar project menyusul')"></div>
  <div class="pbody"><h3>${p.title}</h3><p>${p.desc}</p>
  <div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div>
  ${p.link?`<p style="margin-top:.8rem"><a class="btn" href="${p.link}" target="_blank" rel="noopener">Lihat project</a></p>`:""}</div></article>`).join("");

// Efek ketik pada role
const roles = ["IT Operations", "Data Analyst", "Network Engineering Enthusiast"];
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

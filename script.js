const isMobile = window.innerWidth <= 768;

let currentPage = 0;
const pages = document.getElementById("pages");
const sections = document.querySelectorAll(".page");
const total = sections.length;

const dotsContainer = document.getElementById("dots");

// DOTS
if(isMobile){
  for(let i=0;i<total;i++){
    let dot = document.createElement("span");
    dotsContainer.appendChild(dot);
  }
}

function updateDots(){
  if(!isMobile) return;

  [...dotsContainer.children].forEach((d,i)=>{
    d.classList.toggle("active", i===currentPage);
  });
}

// SWIPE MOBILE
if(isMobile){

  let startX = 0;

  document.addEventListener("touchstart", e=>{
    startX = e.touches[0].clientX;
  });

  document.addEventListener("touchend", e=>{
    let diff = e.changedTouches[0].clientX - startX;

    if(diff > 50) currentPage--;
    if(diff < -50) currentPage++;

    currentPage = Math.max(0, Math.min(currentPage, total-1));

    pages.style.transform = `translateX(-${currentPage * 100}vw)`;
    updateDots();
  });

  updateDots();
}

// ENTER
function enter(withMusic){
  document.getElementById("intro").style.display="none";
  document.getElementById("app").style.display="block";

  if(withMusic){
    const audio = document.getElementById("audio");
    audio.play().catch(()=>{});
  }
}

// COUNTDOWN
const target = new Date("July 11, 2026 21:00:00").getTime();

setInterval(()=>{
  const el = document.getElementById("countdown");
  if(!el) return;

  const now = new Date().getTime();
  const diff = target - now;

  const d = Math.floor(diff/(1000*60*60*24));
  const h = Math.floor((diff/(1000*60*60))%24);
  const m = Math.floor((diff/(1000*60))%60);

  el.innerHTML = `${d} días · ${h} hs · ${m} min`;
},1000);

// GLITTER
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles=[];

for(let i=0;i<100;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*5,
    s:Math.random()*0.4
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle="rgba(212,175,55,0.3)";
    ctx.fill();

    p.y += p.s;
    if(p.y > canvas.height) p.y = 0;
  });
}

setInterval(draw,30);

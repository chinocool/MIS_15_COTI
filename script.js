// INICIO EXPERIENCIA
function startExperience() {
  document.getElementById("intro").style.opacity = "0";

  setTimeout(() => {
    document.getElementById("intro").style.display = "none";
    document.getElementById("music").src += "&autoplay=1";
  }, 800);
}

// COUNTDOWN DINÁMICO
const target = new Date("July 11, 2026 21:00:00").getTime();
const el = document.getElementById("countdown");

setInterval(() => {
  const now = new Date().getTime();
  const diff = target - now;

  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff/(1000*60*60))%24);
  const m = Math.floor((diff/(1000*60))%60);

  el.innerHTML = `${d} días · ${h} hs · ${m} min`;
}, 1000);

// SCROLL REVEAL PRO
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if(top < window.innerHeight - 120){
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// PARTICULAS PROFUNDIDAD
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<120;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    size: Math.random()*2,
    speed: Math.random()*0.7,
    alpha: Math.random()
  });
}

function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    ctx.beginPath();
    ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fill();

    p.y += p.speed;

    if(p.y > canvas.height){
      p.y = 0;
      p.x = Math.random()*canvas.width;
    }
  });
}

setInterval(drawParticles, 30);

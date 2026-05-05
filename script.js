// ENTRADA
function entrar() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("contenido").style.display = "block";

  // activar música
  document.getElementById("music").src += "&autoplay=1";
}

// COUNTDOWN
const fechaEvento = new Date("July 11, 2026 21:00:00").getTime();
const contador = document.getElementById("contador");

setInterval(() => {
  const ahora = new Date().getTime();
  const diff = fechaEvento - ahora;

  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff/(1000*60*60))%24);
  const m = Math.floor((diff/(1000*60))%60);

  contador.innerHTML = `${d} días ${h} hs ${m} min`;
}, 1000);

// FADE AL HACER SCROLL
const faders = document.querySelectorAll('.fade');

window.addEventListener('scroll', () => {
  faders.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if(top < window.innerHeight - 100){
      el.classList.add('visible');
    }
  });
});

// PARTÍCULAS DORADAS
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<80;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2,
    d: Math.random()*1
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "gold";

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  });

  update();
}

function update(){
  particles.forEach(p => {
    p.y += p.d;
    if(p.y > canvas.height){
      p.y = 0;
      p.x = Math.random()*canvas.width;
    }
  });
}

setInterval(draw,33);

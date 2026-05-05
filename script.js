document.addEventListener("DOMContentLoaded", () => {

let musicOn = false;
const audio = document.getElementById("audio");

document.body.classList.add("no-scroll");

setTimeout(()=>{
  document.getElementById("loader").style.display="none";
},1200);

window.openEnvelope = function(){
  document.querySelector(".env").classList.add("open");

  setTimeout(()=>{
    document.getElementById("envelope").style.display="none";
    document.getElementById("musicChoice").style.display="flex";
  },900);
}

window.enter = function(withMusic){
  musicOn = withMusic;

  document.getElementById("musicChoice").style.display="none";
  document.getElementById("app").classList.add("active");
  document.body.classList.remove("no-scroll");

  if(musicOn){
    audio.volume = 0;
    audio.play();
    let v=0;
    let i=setInterval(()=>{
      if(v<0.3){ v+=0.02; audio.volume=v; }
      else clearInterval(i);
    },100);
  }

  reveal();
}

window.toggleMusic = function(){
  if(audio.paused) audio.play();
  else audio.pause();
}

// COUNTDOWN
const target = new Date("July 11, 2026 21:00:00").getTime();

setInterval(()=>{
  const now = new Date().getTime();
  const diff = target-now;

  const d = Math.floor(diff/(1000*60*60*24));
  const h = Math.floor((diff/(1000*60*60))%24);
  const m = Math.floor((diff/(1000*60))%60);

  document.getElementById("countdown").innerHTML =
    `${d} días · ${h} hs · ${m} min`;
},1000);

// SCROLL
function reveal(){
  document.querySelectorAll(".reveal").forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight-100){
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", reveal);

// SLIDER
let slideIndex = 0;
setInterval(()=>{
  const slides = document.getElementById("slides");
  if(!slides) return;

  slideIndex++;
  slides.style.transform = `translateX(-${slideIndex*270}px)`;

  if(slideIndex > slides.children.length-2){
    slideIndex = 0;
  }
},3000);

// FONDO FESTIVO
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls=[];

for(let i=0;i<40;i++){
  balls.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*20+10,
    speed:Math.random()*0.3,
    alpha:Math.random()*0.5+0.3
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  balls.forEach(b=>{
    let g = ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r);
    g.addColorStop(0,`rgba(255,215,0,${b.alpha})`);
    g.addColorStop(1,"transparent");

    ctx.fillStyle=g;
    ctx.beginPath();
    ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
    ctx.fill();

    b.y += b.speed;

    if(b.y > canvas.height){
      b.y = 0;
      b.x = Math.random()*canvas.width;
    }
  });
}

setInterval(draw,30);

});

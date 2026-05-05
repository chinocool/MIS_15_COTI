document.addEventListener("DOMContentLoaded", () => {

const audio = document.getElementById("audio");
let musicOn = false;

// LOADER
setTimeout(()=>{
  document.getElementById("loader").style.display="none";
},1000);

// SOBRE
window.openEnvelope = function(){
  document.querySelector(".env").classList.add("open");

  setTimeout(()=>{
    document.getElementById("envelope").style.display="none";
    document.getElementById("musicChoice").style.display="flex";
  },800);
}

// ENTRAR
window.enter = function(withMusic){
  musicOn = withMusic;

  document.getElementById("musicChoice").style.display="none";
  document.getElementById("app").style.display="block";

  if(musicOn){
    audio.volume=0;
    audio.play();

    let v=0;
    let i=setInterval(()=>{
      if(v<0.3){ v+=0.02; audio.volume=v; }
      else clearInterval(i);
    },100);
  }

  reveal();
}

// AUDIO
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
let i=0;
setInterval(()=>{
  const s=document.getElementById("slides");
  if(!s) return;

  i++;
  s.style.transform=`translateX(-${i*280}px)`;

  if(i>2) i=0;
},3000);

// FONDO
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let p=[];
for(let i=0;i<30;i++){
  p.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*2,s:Math.random()*0.2});
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  p.forEach(e=>{
    ctx.beginPath();
    ctx.arc(e.x,e.y,e.r,0,Math.PI*2);
    ctx.fillStyle="rgba(212,175,55,0.25)";
    ctx.fill();

    e.y+=e.s;
    if(e.y>innerHeight) e.y=0;
  });
}

setInterval(draw,30);

});

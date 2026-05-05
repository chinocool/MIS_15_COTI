document.addEventListener("DOMContentLoaded", () => {

const audio = document.getElementById("audio");
let musicOn = false;

// LOADER
setTimeout(()=>{
  const loader = document.getElementById("loader");
  loader.style.opacity = 0;
  setTimeout(()=> loader.style.display="none",800);
},1200);

// SOBRE
window.openEnvelope = function(){
  document.querySelector(".env").classList.add("open");

  setTimeout(()=>{
    document.getElementById("envelope").style.opacity=0;
    setTimeout(()=>{
      document.getElementById("envelope").style.display="none";
      document.getElementById("musicChoice").style.display="flex";
    },600);
  },1000);
}

// ENTRAR
window.enter = function(withMusic){
  musicOn = withMusic;

  document.getElementById("musicChoice").style.display="none";
  document.getElementById("app").style.display="block";

  if(musicOn){
    audio.volume=0;
    audio.play();
    fadeAudio();
  }

  reveal();
}

function fadeAudio(){
  let v=0;
  let i=setInterval(()=>{
    if(v<0.3){ v+=0.02; audio.volume=v; }
    else clearInterval(i);
  },100);
}

// REVEAL
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
},3500);

// FONDO FINO
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let p=[];
for(let i=0;i<60;i++){
  p.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*2,s:Math.random()*0.3});
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  p.forEach(e=>{
    ctx.beginPath();
    ctx.arc(e.x,e.y,e.r,0,Math.PI*2);
    ctx.fillStyle="rgba(212,175,55,0.5)";
    ctx.fill();

    e.y+=e.s;
    if(e.y>innerHeight) e.y=0;
  });
}

setInterval(draw,30);

});

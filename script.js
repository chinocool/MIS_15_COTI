document.addEventListener("DOMContentLoaded", () => {

//////////////////////////////////////////////////
// ENTER
//////////////////////////////////////////////////

window.enter = function(withMusic){

  document.getElementById("intro").style.display="none";
  document.getElementById("app").style.display="block";

  if(withMusic){
    const audio = document.getElementById("audio");
    audio.play().catch(()=>{});
  }
}

//////////////////////////////////////////////////
// COUNTDOWN
//////////////////////////////////////////////////

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

//////////////////////////////////////////////////
// SLIDER TOUCH
//////////////////////////////////////////////////

const slider = document.getElementById("slider");
const track = document.getElementById("track");

let startX = 0;
let current = 0;

if(slider){

  slider.addEventListener("touchstart", e=>{
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchmove", e=>{
    const diff = e.touches[0].clientX - startX;
    track.style.transform = `translateX(${current + diff}px)`;
  });

  slider.addEventListener("touchend", e=>{
    const diff = e.changedTouches[0].clientX - startX;
    current += diff;
  });
}

//////////////////////////////////////////////////
// GLITTER
//////////////////////////////////////////////////

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<80;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*4,
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

});

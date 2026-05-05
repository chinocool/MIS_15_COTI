function enter(withMusic){

  document.getElementById("intro").style.display="none";
  document.getElementById("app").style.display="block";

  if(withMusic){
    const audio = document.getElementById("audio");
    audio.volume = 0;
    audio.play().catch(()=>{});

    let v=0;
    let fade = setInterval(()=>{
      if(v < 0.4){
        v += 0.02;
        audio.volume = v;
      } else clearInterval(fade);
    },120);
  }

  reveal();
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

// SCROLL
function reveal(){
  document.querySelectorAll(".section").forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight-100){
      el.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", reveal);

// SLIDER SWIPE
const slider = document.getElementById("slider");
const track = document.getElementById("track");

let isDown = false;
let startX;
let scrollLeft = 0;

slider.addEventListener("mousedown", (e)=>{
  isDown = true;
  startX = e.pageX;
});

slider.addEventListener("mouseleave", ()=> isDown = false);
slider.addEventListener("mouseup", ()=> isDown = false);

slider.addEventListener("mousemove", (e)=>{
  if(!isDown) return;
  const walk = (e.pageX - startX);
  track.style.transform = `translateX(${scrollLeft + walk}px)`;
});

slider.addEventListener("touchstart", (e)=>{
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchmove", (e)=>{
  const walk = e.touches[0].clientX - startX;
  track.style.transform = `translateX(${walk}px)`;
});

// FONDO PARTICULAS
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<40;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*2,
    s:Math.random()*0.3
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle="rgba(212,175,55,0.3)";
    ctx.fill();

    p.y+=p.s;
    if(p.y>canvas.height) p.y=0;
  });
}

setInterval(draw,30);

document.addEventListener("DOMContentLoaded", () => {

//////////////////////////////////////////////////
// 🎵 ENTER
//////////////////////////////////////////////////

window.enter = function(withMusic){

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

//////////////////////////////////////////////////
// 🎬 REVEAL
//////////////////////////////////////////////////

function reveal(){
  document.querySelectorAll(".section").forEach(el=>{
    const top = el.getBoundingClientRect().top;
    if(top < window.innerHeight - 120){
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", reveal);

//////////////////////////////////////////////////
// ⏳ COUNTDOWN
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
// 📱 SLIDER PRO (FIX TOTAL)
//////////////////////////////////////////////////

const slider = document.getElementById("slider");
const track = document.getElementById("track");

if(slider && track){

  let isDragging = false;
  let startX = 0;
  let current = 0;
  let prev = 0;
  let velocity = 0;
  let frame;

  slider.addEventListener("touchstart", e=>{
    isDragging = true;
    startX = e.touches[0].clientX;
    cancelAnimationFrame(frame);
  });

  slider.addEventListener("touchmove", e=>{
    if(!isDragging) return;

    const x = e.touches[0].clientX;
    const diff = x - startX;

    velocity = diff * 0.3;
    current = prev + diff;

    track.style.transform = `translateX(${current}px)`;
  });

  slider.addEventListener("touchend", ()=>{
    isDragging = false;
    prev = current;
    momentum();
  });

  function momentum(){
    velocity *= 0.95;
    current += velocity;

    const max = 0;
    const min = -(track.scrollWidth - slider.offsetWidth);

    if(current > max) current = max;
    if(current < min) current = min;

    track.style.transform = `translateX(${current}px)`;

    if(Math.abs(velocity) > 0.3){
      frame = requestAnimationFrame(momentum);
    }
  }
}

//////////////////////////////////////////////////
// ✨ GLITTER + SPARKLE
//////////////////////////////////////////////////

const canvas = document.getElementById("bg");

if(canvas){

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  let sparkles = [];

  for(let i=0;i<120;i++){
    particles.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      r:Math.random()*8+2,
      s:Math.random()*0.5+0.2,
      a:Math.random()*0.4+0.2
    });
  }

  for(let i=0;i<30;i++){
    sparkles.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      size:Math.random()*2,
      life:Math.random()*100
    });
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{
      let g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*5);
      g.addColorStop(0,`rgba(255,215,0,${p.a})`);
      g.addColorStop(1,"transparent");

      ctx.fillStyle=g;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r*5,0,Math.PI*2);
      ctx.fill();

      p.y += p.s;
      p.x += Math.sin(p.y * 0.01)*0.3;

      if(p.y > canvas.height){
        p.y = 0;
        p.x = Math.random()*canvas.width;
      }
    });

    sparkles.forEach(s=>{
      ctx.beginPath();
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
      ctx.fill();

      s.life--;

      if(s.life <= 0){
        s.x = Math.random()*canvas.width;
        s.y = Math.random()*canvas.height;
        s.life = Math.random()*100;
      }
    });
  }

  setInterval(draw,30);
}

});

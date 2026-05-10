document.addEventListener("DOMContentLoaded", () => {

//////////////////////////////////////////////////
// ENTER
//////////////////////////////////////////////////

let isPlaying = false;
  
window.enter = function(withMusic){
  document.getElementById("intro").style.display="none";
  document.getElementById("app").style.display="block";
 
  if(withMusic){
    setTimeout(()=> toggleMusic(),300);
  } 
  else{
    toggleMusic();
  }
}

  
//////////////////////////////////////////////////
// ✨ GLITTER BACKGROUND
//////////////////////////////////////////////////
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

// tamaño
function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// partículas doradas
const particles = Array.from({length:80}, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  s: Math.random() * 0.5 + 0.2,
  a: Math.random() * 0.5 + 0.2
}));

// destellos
const sparkles = Array.from({length:30}, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 2,
  life: Math.random() * 100
}));

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // glitter dorado
  particles.forEach(p=>{
    let g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*5);
    g.addColorStop(0,`rgba(212,175,55,${p.a})`);
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

  // sparkle (destellos)
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

  requestAnimationFrame(draw);
}

draw();
  

//////////////////////////////////////////////////
// MUSIC
//////////////////////////////////////////////////
  
window.toggleMusic = function(){
  const audio = document.getElementById("audio");
  const btn = document.getElementById("music-control");

  if(!audio) return;

  if(isPlaying){
    audio.pause();
    isPlaying = false;
    btn.classList.remove("active");
    btn.classList.add("off");
    //btn.innerHTML = "🔇";
  } else {
    audio.volume = 0.4;
    audio.play().then(()=>{
      isPlaying = true;
      btn.classList.remove("off");
      btn.classList.add("active");
      //btn.innerHTML = "🔊";
    });
  }
}

//////////////////////////////////////////////////
// COUNTDOWN
//////////////////////////////////////////////////

const target = new Date("July 11, 2026 21:00:00").getTime();

setInterval(()=>{
  const el = document.getElementById("countdown");
  if(!el) return;

  const now = Date.now();
  const diff = target - now;

  const d = Math.floor(diff/(1000*60*60*24));
  const h = Math.floor((diff/(1000*60*60))%24);
  const m = Math.floor((diff/(1000*60))%60);
  const s = Math.floor((diff/1000)%60);

  el.innerHTML = `
    <div class="countdown">
      <div class="cd-item"><span class="cd-value">${d}</span><span class="cd-label">Días</span></div>
      <div class="cd-sep"></div>
      <div class="cd-item"><span class="cd-value">${h}</span><span class="cd-label">Hs</span></div>
      <div class="cd-sep"></div>
      <div class="cd-item"><span class="cd-value">${m}</span><span class="cd-label">Min</span></div>
      <div class="cd-sep"></div>
      <div class="cd-item"><span class="cd-value">${s}</span><span class="cd-label">Seg</span></div>
    </div>`;
},1000);

//////////////////////////////////////////////////
// SLIDER PRO
//////////////////////////////////////////////////

const slider = document.getElementById("slider");
const track = document.getElementById("track");

let current = 0;
let velocity = 0;
let isDown = false;
let startX = 0;

function setupInfinite(){
  const items = Array.from(track.children);
  items.forEach(item=>{
    track.appendChild(item.cloneNode(true));
  });
}

slider.addEventListener("touchstart", e=>{
  isDown = true;
  startX = e.touches[0].clientX;
  stopAuto();
});

slider.addEventListener("touchmove", e=>{
  if(!isDown) return;

  let x = e.touches[0].clientX;
  velocity = x - startX;
  startX = x;

  current += velocity;
  update();
});

slider.addEventListener("touchend", ()=>{
  isDown = false;
  startAuto();
});

slider.addEventListener("mousedown", e=>{
  isDown = true;
  startX = e.clientX;
  stopAuto();
});

slider.addEventListener("mousemove", e=>{
  if(!isDown) return;

  let x = e.clientX;
  velocity = x - startX;
  startX = x;

  current += velocity;
  update();
});

slider.addEventListener("mouseup", ()=>{
  isDown = false;
  startAuto();
});

slider.addEventListener("mouseleave", ()=>{
  isDown = false;
});

//////////////////////////////////////////////////
// AUTOPLAY
//////////////////////////////////////////////////

let autoRAF;

function autoMove(){
  current -= 0.25;
  update();
  autoRAF = requestAnimationFrame(autoMove);
}

function startAuto(){
  cancelAnimationFrame(autoRAF);
  autoMove();
}

function stopAuto(){
  cancelAnimationFrame(autoRAF);
}

//////////////////////////////////////////////////
// TECLADO
//////////////////////////////////////////////////

document.addEventListener("keydown", e=>{
  if(e.key === "ArrowRight"){
    current -= 120;
    update();
  }
  if(e.key === "ArrowLeft"){
    current += 120;
    update();
  }
});

//////////////////////////////////////////////////
// LOOP
//////////////////////////////////////////////////

function fixLoop(){

  const width = track.scrollWidth / 2;

  if(current < -width){
    current += width;
    track.style.transition = "none";
    track.offsetHeight;
  }

  if(current > 0){
    current -= width;
    track.style.transition = "none";
    track.offsetHeight;
  }
}

function update(){
  fixLoop();
  track.style.transform = `translateX(${current}px)`;
  setActive();
}

//////////////////////////////////////////////////
// EFECTO PROFUNDIDAD
//////////////////////////////////////////////////

function setActive(){

  const rect = slider.getBoundingClientRect();
  const center = rect.left + rect.width/2;

  track.querySelectorAll("img").forEach(img=>{
    const r = img.getBoundingClientRect();
    const imgCenter = r.left + r.width/2;

    const dist = Math.abs(center - imgCenter);
    const ratio = Math.min(dist/(rect.width/2),1);

    const scale = 1.1 - ratio*0.25;
    const blur = ratio*1.5;

    img.style.transform = `scale(${scale})`;
    img.style.filter = `blur(${blur}px)`;
  });
}

//////////////////////////////////////////////////
// INIT
//////////////////////////////////////////////////

setTimeout(()=>{
  setupInfinite();
  startAuto();
},300);

});

//////////////////////////////////////////////////
// 🔥 GOOGLE FORM (GLOBAL)
//////////////////////////////////////////////////

window.openForm = function(url){
  const modal = document.getElementById("formModal");
  const frame = document.getElementById("formFrame");

  frame.src = url;
  modal.style.display = "flex";
}

window.closeForm = function(){
  const modal = document.getElementById("formModal");
  const frame = document.getElementById("formFrame");

  modal.style.display = "none";
  frame.src = ""; // 👈 limpia el form
}

// cerrar afuera
window.addEventListener("click", function(e){
  const modal = document.getElementById("formModal");
  if(e.target === modal){
    modal.style.display = "none";
  }
});

// cerrar con ESC
document.addEventListener("keydown", e=>{
  if(e.key === "Escape"){
    closeForm();
  }
});

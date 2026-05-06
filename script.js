document.addEventListener("DOMContentLoaded", () => {

//////////////////////////////////////////////////
// ENTER
//////////////////////////////////////////////////

window.enter = function(withMusic){
  document.getElementById("intro").style.display="none";
  document.getElementById("app").style.display="block";
 
  if(withMusic){
    setTimeout(()=> toggleMusic(),300);
  }
}

//////////////////////////////////////////////////
// MUSIC
//////////////////////////////////////////////////

let isPlaying = false;

window.toggleMusic = function(){
  const audio = document.getElementById("audio");
  const btn = document.getElementById("music-control");

  if(!audio) return;

  if(isPlaying){
    audio.pause();
    isPlaying = false;
    btn.classList.remove("active");
    btn.classList.add("off");
    btn.innerHTML = "🔇";
  } else {
    audio.volume = 0.4;
    audio.play().then(()=>{
      isPlaying = true;
      btn.classList.remove("off");
      btn.classList.add("active");
      btn.innerHTML = "🔊";
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

//////////////////////////////////////////////////
// SETUP INFINITO
//////////////////////////////////////////////////

function setupInfinite(){
  const items = Array.from(track.children);
  items.forEach(item=>{
    track.appendChild(item.cloneNode(true));
  });
}

//////////////////////////////////////////////////
// TOUCH / DRAG
//////////////////////////////////////////////////

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

//////////////////////////////////////////////////
// MOUSE
//////////////////////////////////////////////////

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
// AUTOPLAY CONTINUO (SIN PAUSAS)
//////////////////////////////////////////////////

let autoRAF;

function autoMove(){
  current -= 0.4; // 👈 velocidad continua suave
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
// CONTROLES TECLADO
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
// SCROLL MOUSE (PRO)
//////////////////////////////////////////////////

slider.addEventListener("wheel", e=>{
  current -= e.deltaY * 0.5;
  update();
});

//////////////////////////////////////////////////
// LOOP INFINITO SUAVE
//////////////////////////////////////////////////

function fixLoop(){
  const width = track.scrollWidth / 2;

  if(current < -width) current += width;
  if(current > 0) current -= width;
}

//////////////////////////////////////////////////
// UPDATE GLOBAL
//////////////////////////////////////////////////

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

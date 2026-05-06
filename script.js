document.addEventListener("DOMContentLoaded", () => {

//////////////////////////////////////////////////
// ENTER
//////////////////////////////////////////////////

window.enter = function(withMusic){
  document.getElementById("intro").style.display="none";
  document.getElementById("app").style.display="block";
 
  if(withMusic){
    setTimeout(()=>{
      toggleMusic();
    },300);
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
    }).catch(()=>{
      alert("Tocá nuevamente para activar la música");
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

  const now = new Date().getTime();
  const diff = target - now;

  const d = Math.floor(diff/(1000*60*60*24));
  const h = Math.floor((diff/(1000*60*60))%24);
  const m = Math.floor((diff/(1000*60))%60);
  const s = Math.floor((diff / 1000) % 60);

  el.innerHTML = `
    <div class="countdown">
      <div class="cd-item"><span class="cd-value">${d}</span><span class="cd-label">Días</span></div>
      <div class="cd-sep"></div>
      <div class="cd-item"><span class="cd-value">${h}</span><span class="cd-label">Hs</span></div>
      <div class="cd-sep"></div>
      <div class="cd-item"><span class="cd-value">${m}</span><span class="cd-label">Min</span></div>
      <div class="cd-sep"></div>
      <div class="cd-item"><span class="cd-value">${s}</span><span class="cd-label">Seg</span></div>
    </div>
  `;
},1000);

//////////////////////////////////////////////////
// SLIDER ULTRA PRO (APP LEVEL)
//////////////////////////////////////////////////

const slider = document.getElementById("slider");
const track = document.getElementById("track");

let startX = 0;
let current = 0;
let velocity = 0;
let lastX = 0;
let isDown = false;
let autoPlayInterval;

//////////////////////////////////////////////////
// SETUP INFINITO
//////////////////////////////////////////////////

function setupInfinite(){
  const items = Array.from(track.children);

  items.forEach(item=>{
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });
}

//////////////////////////////////////////////////
// TOUCH
//////////////////////////////////////////////////

if(slider){

  slider.addEventListener("touchstart", e=>{
    isDown = true;
    startX = e.touches[0].clientX;
    lastX = startX;
    velocity = 0;
    stopAutoplay();
  });

  slider.addEventListener("touchmove", e=>{
    if(!isDown) return;

    const x = e.touches[0].clientX;
    const diff = x - startX;

    velocity = x - lastX;
    lastX = x;

    track.style.transform = `translateX(${current + diff}px)`;
  });

  slider.addEventListener("touchend", e=>{
    isDown = false;

    const diff = e.changedTouches[0].clientX - startX;
    current += diff;

    applyMomentum();
    startAutoplay();
  });
}

//////////////////////////////////////////////////
// INERCIA REAL
//////////////////////////////////////////////////

function applyMomentum(){

  let momentum = velocity * 4;

  let target = current + momentum;

  // interpolación suave
  let start = current;
  let startTime = null;

  function animate(time){
    if(!startTime) startTime = time;
    let progress = (time - startTime) / 600;

    if(progress > 1) progress = 1;

    // easing suave
    let ease = 1 - Math.pow(1 - progress, 3);

    current = start + (target - start) * ease;
    track.style.transform = `translateX(${current}px)`;

    if(progress < 1){
      requestAnimationFrame(animate);
    } else {
      snapToClosest();
    }
  }

  requestAnimationFrame(animate);
}

//////////////////////////////////////////////////
// SNAP PERFECTO
//////////////////////////////////////////////////

function snapToClosest(){

  const images = track.querySelectorAll("img");
  const sliderRect = slider.getBoundingClientRect();
  const center = sliderRect.left + sliderRect.width / 2;

  let closest = null;
  let minDist = Infinity;

  images.forEach(img=>{
    const rect = img.getBoundingClientRect();
    const imgCenter = rect.left + rect.width / 2;

    const dist = Math.abs(center - imgCenter);

    if(dist < minDist){
      minDist = dist;
      closest = img;
    }
  });

  if(closest){
    const rect = closest.getBoundingClientRect();
    const imgCenter = rect.left + rect.width / 2;
    const offset = center - imgCenter;

    current += offset;

    //track.style.transition = "transform .5s cubic-bezier(.22,.61,.36,1)";
    track.style.transition = "transform .8s cubic-bezier(0.22, 1, 0.36, 1)";
    track.style.transform = `translateX(${current}px)`;

    setTimeout(()=>{
      track.style.transition = "none";
    },500);
  }

  fixLoop();
  setActive();
}

//////////////////////////////////////////////////
// LOOP SIN SALTO
//////////////////////////////////////////////////

function fixLoop(){

  const width = track.scrollWidth / 2;

  if(current < -width){
    current += width;
    track.style.transition = "none";
    track.style.transform = `translateX(${current}px)`;
    track.offsetHeight;
  }

  if(current > 0){
    current -= width;
    track.style.transition = "none";
    track.style.transform = `translateX(${current}px)`;
    track.offsetHeight;
  }
}

//////////////////////////////////////////////////
// ACTIVO + BLUR DINÁMICO
//////////////////////////////////////////////////

function setActive(){

  const sliderRect = slider.getBoundingClientRect();
  const center = sliderRect.left + sliderRect.width / 2;

  const images = track.querySelectorAll("img");

  images.forEach(img=>{
    const rect = img.getBoundingClientRect();
    const imgCenter = rect.left + rect.width / 2;

    const dist = Math.abs(center - imgCenter);

    if(dist < rect.width / 2){
      img.classList.add("active");
      img.style.filter = "none";
    } else {
      img.classList.remove("active");

      // 💎 blur dinámico según distancia
      const blur = Math.min(dist / 200, 3);
      img.style.filter = `blur(${blur}px)`;
    }
  });
}

//////////////////////////////////////////////////
// AUTOPLAY SUAVE
//////////////////////////////////////////////////

function startAutoplay(){

  autoPlayInterval = setInterval(()=>{
    current -= 120; // velocidad autoplay
    snapToClosest();
  },3000);
}

function stopAutoplay(){
  clearInterval(autoPlayInterval);
}

//////////////////////////////////////////////////
// INIT
//////////////////////////////////////////////////

setTimeout(()=>{
  setupInfinite();
  setActive();
  startAutoplay();
},300);

//////////////////////////////////////////////////
// EVENTOS
//////////////////////////////////////////////////

slider.addEventListener("touchmove", setActive);
window.addEventListener("resize", setActive);

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

//////////////////////////////////////////////////
// COPY ALIAS
//////////////////////////////////////////////////

window.copyAlias = function(){

  const text = document.getElementById("alias-value").innerText;

  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(text)
      .then(()=>showCopyFeedback())
      .catch(()=>fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text){
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
    showCopyFeedback();
  } catch(err){
    alert("No se pudo copiar 😢");
  }

  document.body.removeChild(textarea);
}

function showCopyFeedback(){
  const btn = document.querySelector(".copy-btn");
  btn.innerText = "Copiado ✓";

  setTimeout(()=>{
    btn.innerText = "Copiar alias";
  },1500);
}

});

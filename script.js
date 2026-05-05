document.addEventListener("DOMContentLoaded", () => {
  // 🎬 carga premium
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });
  
  // fallback por si load no dispara rápido
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 1200);
  
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
// toggle Music
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

  //el.innerHTML = `${d} días · ${h} hs · ${m} min · ${s} seg <br>días hs min seg`;
  el.innerHTML = `
  <div class="countdown">

    <div class="cd-item">
      <span class="cd-value">${d}</span>
      <span class="cd-label">Días</span>
    </div>

    <div class="cd-sep"></div>

    <div class="cd-item">
      <span class="cd-value">${h}</span>
      <span class="cd-label">Hs</span>
    </div>

    <div class="cd-sep"></div>

    <div class="cd-item">
      <span class="cd-value">${m}</span>
      <span class="cd-label">Min</span>
    </div>

    <div class="cd-sep"></div>

    <div class="cd-item">
      <span class="cd-value">${s}</span>
      <span class="cd-label">Seg</span>
    </div>

  </div>
`;
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

window.copyAlias = function(){

  const text = document.getElementById("alias-value").innerText;

  // método moderno
  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(text)
      .then(()=>{
        showCopyFeedback();
      })
      .catch(()=>{
        fallbackCopy(text);
      });
  } else {
    fallbackCopy(text);
  }

}

// fallback universal
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

// feedback lindo
function showCopyFeedback(){
  const btn = document.querySelector(".copy-btn");
  btn.innerText = "Copiado ✓";

  setTimeout(()=>{
    btn.innerText = "Copiar alias";
  },1500);
}
  
});

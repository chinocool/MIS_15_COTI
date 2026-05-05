let currentPage = 0;
const pages = document.getElementById("pages");
const sections = document.querySelectorAll(".page");
const total = sections.length;

// DOTS
const dotsContainer = document.getElementById("dots");

for(let i=0;i<total;i++){
  let dot = document.createElement("span");
  dotsContainer.appendChild(dot);
}

function updateUI(){
  sections.forEach((s,i)=>{
    s.classList.toggle("active", i===currentPage);
  });

  [...dotsContainer.children].forEach((d,i)=>{
    d.classList.toggle("active", i===currentPage);
  });
}

// PARALLAX TRANSITION
function goToPage(index){
  currentPage = Math.max(0, Math.min(index, total-1));

  pages.style.transform = `translateX(-${currentPage * 100}vw)`;

  updateUI();
}

updateUI();

// SWIPE PRO
let startX = 0;
let endX = 0;

document.addEventListener("touchstart", e=>{
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e=>{
  endX = e.changedTouches[0].clientX;

  let diff = endX - startX;

  if(diff > 60) goToPage(currentPage - 1);
  if(diff < -60) goToPage(currentPage + 1);
});

// ENTER
function enter(withMusic){
  document.getElementById("intro").style.display="none";
  document.getElementById("app").style.display="block";

  if(withMusic){
    const audio = document.getElementById("audio");
    audio.play().catch(()=>{});
  }
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

// 🎬 SLIDER NETFLIX EFFECT
const track = document.getElementById("track");

function updateSlider(){
  const imgs = track.querySelectorAll("img");

  imgs.forEach((img,i)=>{
    img.classList.remove("active");
  });

  const center = Math.round(Math.abs(track.offsetLeft)/220);
  if(imgs[center]) imgs[center].classList.add("active");
}

setInterval(updateSlider,200);

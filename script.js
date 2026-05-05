const isMobile = window.innerWidth <= 768;

let currentPage = 0;
const pages = document.getElementById("pages");
const sections = document.querySelectorAll(".page");
const total = sections.length;

const dotsContainer = document.getElementById("dots");

// DOTS
if(isMobile){
  for(let i=0;i<total;i++){
    let dot = document.createElement("span");
    dotsContainer.appendChild(dot);
  }
}

function updateUI(){
  if(!isMobile) return;

  sections.forEach((s,i)=>{
    s.classList.toggle("active", i===currentPage);
  });

  [...dotsContainer.children].forEach((d,i)=>{
    d.classList.toggle("active", i===currentPage);
  });
}

// MOBILE SWIPE
if(isMobile){

  function goToPage(index){
    currentPage = Math.max(0, Math.min(index, total-1));
    pages.style.transform = `translateX(-${currentPage * 100}vw)`;
    updateUI();
  }

  let startX = 0;

  document.addEventListener("touchstart", e=>{
    startX = e.touches[0].clientX;
  });

  document.addEventListener("touchend", e=>{
    let diff = e.changedTouches[0].clientX - startX;

    if(diff > 60) goToPage(currentPage - 1);
    if(diff < -60) goToPage(currentPage + 1);
  });

  updateUI();
}

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

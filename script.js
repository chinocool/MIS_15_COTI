document.addEventListener("DOMContentLoaded", () => {

const audio = document.getElementById("audio");

// LOADER
setTimeout(()=>{
  document.getElementById("loader").style.display="none";
},1000);

// SOBRE
window.openEnvelope = function(){
  document.querySelector(".card").classList.add("open");

  setTimeout(()=>{
    document.getElementById("envelope").style.display="none";
    document.getElementById("musicChoice").style.display="flex";
  },800);
}

// ENTRAR
window.enter = function(withMusic){
  document.getElementById("musicChoice").style.display="none";
  document.getElementById("app").style.display="block";

  if(withMusic){
    audio.volume=0;
    audio.play();

    let v=0;
    let i=setInterval(()=>{
      if(v<0.3){ v+=0.02; audio.volume=v; }
      else clearInterval(i);
    },100);
  }

  reveal();
}

// SCROLL
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
},3000);

});

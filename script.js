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
    audio.play();
  }

  reveal();
}

// REVEAL
function reveal(){
  document.querySelectorAll(".reveal").forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight-100){
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);

// 🔥 SLIDER FUNCIONAL REAL
let index = 0;

setInterval(()=>{
  const track = document.getElementById("track");
  const imgs = track.children.length;

  index++;
  if(index >= imgs) index = 0;

  track.style.transform = `translateX(-${index * 280}px)`;

},3000);

});

document.addEventListener("DOMContentLoaded", () => {

const audio = document.getElementById("audio");

// LOADER
setTimeout(()=>{
  document.getElementById("loader").style.display="none";
},800);

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
}

// 🔥 SLIDER REAL FUNCIONANDO
let index = 0;

setInterval(()=>{
  const track = document.getElementById("track");
  const images = track.children.length;

  index++;

  if(index >= images){
    index = 0;
  }

  track.style.transform = `translateX(-${index * 300}px)`;

},2500);

});

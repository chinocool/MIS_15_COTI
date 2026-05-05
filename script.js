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

// COUNTDOWN
const target = new Date("July 11, 2026 21:00:00").getTime();

setInterval(()=>{
  const now = new Date().getTime();
  const diff = target-now;

  const d = Math.floor(diff/(1000*60*60*24));
  const h = Math.floor((diff/(1000*60*60))%24);
  const m = Math.floor((diff/(1000*60))%60);

  document.getElementById("countdown").innerHTML =
    `${d} días ${h} hs ${m} min`;
},1000);

// SLIDER
let i=0;
setInterval(()=>{
  const track = document.getElementById("track");
  const total = track.children.length;

  i++;
  if(i >= total) i = 0;

  track.style.transform = `translateX(-${i*270}px)`;

},3000);

});

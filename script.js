function entrar(){
  document.getElementById("intro").style.display="none";
  document.getElementById("app").style.display="block";

  const audio = document.getElementById("audio");
  audio.play().catch(()=>{});
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

  el.innerHTML = `${d} días ${h} hs ${m} min`;
},1000);

// SLIDER
let i=0;

setInterval(()=>{
  const track = document.getElementById("track");
  if(!track) return;

  const total = track.children.length;

  i++;
  if(i >= total) i = 0;

  track.style.transform = `translateX(-${i*210}px)`;

},3000);
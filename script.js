function enter(withMusic){

  document.getElementById("intro").style.display="none";
  document.getElementById("app").style.display="block";

  if(withMusic){
    const audio = document.getElementById("audio");
    audio.volume = 0;

    audio.play().catch(()=>{});

    let v=0;
    let fade = setInterval(()=>{
      if(v < 0.3){
        v += 0.02;
        audio.volume = v;
      } else {
        clearInterval(fade);
      }
    },100);
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

// SLIDER
let index = 0;

setInterval(()=>{
  const track = document.getElementById("track");
  if(!track) return;

  const total = track.children.length;

  index++;
  if(index >= total) index = 0;

  track.style.transform = `translateX(-${index * 280}px)`;

},3500);

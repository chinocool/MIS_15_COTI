function entrar(){
  document.getElementById("intro").style.display="none";
  document.getElementById("app").style.display="block";

  const audio = document.getElementById("audio");
  audio.play().catch(()=>{});
}

// COUNTDOWN
const target = new Date("July 11, 2026 21:00:00").getTime();

setInterval(()=>{
  const now = new Date().getTime();
  const diff = target - now;

  const d = Math.floor(diff/(1000*60*60*24));
  const h = Math.floor((diff/(1000*60*60))%24);
  const m = Math.floor((diff/(1000*60))%60);

  document.getElementById("countdown").innerHTML =
    `${d} días ${h} hs ${m} min`;
},1000);

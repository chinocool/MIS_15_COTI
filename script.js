let musicOn = false;

// SOBRE
function openEnvelope(){
  document.getElementById("envelope").classList.add("open");

  setTimeout(()=>{
    document.getElementById("envelope").style.display="none";
    document.getElementById("musicChoice").style.display="flex";
  },1000);
}

// ENTRAR
function enter(withMusic){
  musicOn = withMusic;
  document.getElementById("musicChoice").style.display="none";

  if(musicOn){
    document.getElementById("music").src += "&autoplay=1";
  }
}

// CONTROL MÚSICA
function toggleMusic(){
  const iframe = document.getElementById("music");
  if(musicOn){
    iframe.src = iframe.src.replace("&autoplay=1","");
    musicOn = false;
  } else {
    iframe.src += "&autoplay=1";
    musicOn = true;
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

  document.getElementById("countdown").innerHTML = `${d} días · ${h} hs · ${m} min`;
},1000);

// SCROLL
window.addEventListener("scroll", ()=>{
  document.querySelectorAll(".reveal").forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight-100){
      el.classList.add("active");
    }
  });
});

// FONDO LUJO
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles=[];

for(let i=0;i<120;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*2,
    a:Math.random(),
    s:Math.random()*0.5
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    let g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*6);
    g.addColorStop(0,`rgba(212,175,55,${p.a})`);
    g.addColorStop(1,"transparent");

    ctx.fillStyle=g;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r*6,0,Math.PI*2);
    ctx.fill();

    p.y+=p.s;
    if(p.y>canvas.height) p.y=0;
  });
}

setInterval(draw,30);

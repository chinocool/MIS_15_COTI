let musicOn = false;

// LOADER
window.onload = () => {
  setTimeout(()=>{
    document.getElementById("loader").style.display="none";
  },2000);
};

// SOBRE
function openEnvelope(){
  document.querySelector(".env").classList.add("open");

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
    document.getElementById("audio").play();
  }
}

// CONTROL AUDIO
function toggleMusic(){
  const audio = document.getElementById("audio");

  if(audio.paused){
    audio.play();
  } else {
    audio.pause();
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
    `${d} días · ${h} hs · ${m} min`;
},1000);

// SCROLL
window.addEventListener("scroll", ()=>{
  document.querySelectorAll(".reveal").forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight-100){
      el.classList.add("active");
    }
  });
});

// FONDO PREMIUM
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles=[];

for(let i=0;i<150;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*2,
    a:Math.random(),
    s:Math.random()*0.7
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

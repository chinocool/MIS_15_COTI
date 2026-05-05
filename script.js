let musicEnabled = false;

// ENTRAR
function enter(withMusic){
  musicEnabled = withMusic;

  document.getElementById("intro").style.opacity = "0";

  setTimeout(() => {
    document.getElementById("intro").style.display = "none";

    if(musicEnabled){
      document.getElementById("music").src += "&autoplay=1";
    }

  }, 800);
}

// COUNTDOWN
const target = new Date("July 11, 2026 21:00:00").getTime();
const cd = document.getElementById("countdown");

setInterval(()=>{
  const now = new Date().getTime();
  const diff = target - now;

  const d = Math.floor(diff/(1000*60*60*24));
  const h = Math.floor((diff/(1000*60*60))%24);
  const m = Math.floor((diff/(1000*60))%60);

  cd.innerHTML = `${d} días · ${h} hs · ${m} min`;
},1000);

// SCROLL REVEAL
const items = document.querySelectorAll('.reveal');

window.addEventListener('scroll', ()=>{
  items.forEach(el=>{
    const top = el.getBoundingClientRect().top;
    if(top < window.innerHeight - 100){
      el.classList.add('active');
    }
  });
});

// PARTICULAS PREMIUM
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<150;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    size: Math.random()*2,
    speed: Math.random()*1,
    alpha: Math.random()
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    ctx.beginPath();
    ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fill();

    p.y += p.speed;

    if(p.y > canvas.height){
      p.y = 0;
      p.x = Math.random()*canvas.width;
    }
  });
}

setInterval(draw, 30);

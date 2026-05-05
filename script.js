// ESPERAR A QUE TODO EL DOM CARGUE
document.addEventListener("DOMContentLoaded", () => {

  let musicOn = false;
  const audio = document.getElementById("audio");

  // BLOQUEAR SCROLL INICIAL
  document.body.classList.add("no-scroll");

  // LOADER (SIEMPRE SE LIBERA)
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if(loader){
      loader.style.opacity = "0";
      setTimeout(() => loader.style.display = "none", 500);
    }
  }, 1200);

  // ===== FUNCIONES =====

  window.openEnvelope = function(){
    const env = document.querySelector(".env");
    const envelope = document.getElementById("envelope");
    const musicChoice = document.getElementById("musicChoice");

    if(env) env.classList.add("open");

    setTimeout(()=>{
      if(envelope) envelope.style.display = "none";
      if(musicChoice) musicChoice.style.display = "flex";
    }, 900);
  }

  window.enter = function(withMusic){
    musicOn = withMusic;

    const musicChoice = document.getElementById("musicChoice");
    const app = document.getElementById("app");

    if(musicChoice) musicChoice.style.display = "none";

    // MOSTRAR CONTENIDO SIEMPRE
    if(app){
      app.style.display = "block";
      app.classList.add("active");
    }

    // LIBERAR SCROLL SIEMPRE
    document.body.classList.remove("no-scroll");

    // MÚSICA SEGURA
    if(musicOn && audio){
      audio.volume = 0;
      audio.play().then(()=>{
        fadeInAudio();
      }).catch(()=>{
        console.log("Autoplay bloqueado por el navegador");
      });
    }

    // FORZAR ANIMACIONES
    setTimeout(reveal, 100);
  }

  function fadeInAudio(){
    let vol = 0;
    const interval = setInterval(()=>{
      if(vol < 0.3){
        vol += 0.02;
        audio.volume = vol;
      } else {
        clearInterval(interval);
      }
    }, 100);
  }

  window.toggleMusic = function(){
    if(!audio) return;

    if(audio.paused){
      audio.play();
    } else {
      audio.pause();
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

  // REVEAL SCROLL
  function reveal(){
    document.querySelectorAll(".reveal").forEach(el=>{
      const top = el.getBoundingClientRect().top;
      if(top < window.innerHeight - 100){
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", reveal);
  window.addEventListener("load", reveal);

  // FONDO (SEGURIDAD)
  const canvas = document.getElementById("bg");
  if(canvas){
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    for(let i=0;i<80;i++){
      particles.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*2,
        a:Math.random(),
        s:Math.random()*0.4
      });
    }

    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);

      particles.forEach(p=>{
        let g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*5);
        g.addColorStop(0,`rgba(212,175,55,${p.a})`);
        g.addColorStop(1,"transparent");

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r*5,0,Math.PI*2);
        ctx.fill();

        p.y += p.s;
        if(p.y > canvas.height) p.y = 0;
      });
    }

    setInterval(draw, 30);
  }

});

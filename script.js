const fechaEvento = new Date("July 11, 2026 21:00:00").getTime();

const contador = document.getElementById("contador");

setInterval(() => {
  const ahora = new Date().getTime();
  const diferencia = fechaEvento - ahora;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);

  contador.innerHTML = `${dias} días ${horas} hs ${minutos} min`;
}, 1000);
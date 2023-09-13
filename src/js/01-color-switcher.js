const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let colorSwitcherId = 0;

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);

function start(e) {
  e.target.toggleAttribute('disabled');
  stopBtn.removeAttribute('disabled');
  colorSwitcherId = setInterval(
    () => (body.style.backgroundColor = getRandomHexColor()),
    1000
  );
}

function stop(e) {
  e.target.toggleAttribute('disabled');
  startBtn.removeAttribute('disabled');
  clearInterval(colorSwitcherId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

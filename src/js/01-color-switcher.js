const refs = {
  bodyEl: document.querySelector('body'),
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};

refs.buttonStart.addEventListener('click', onStartClick);
refs.buttonStop.addEventListener('click', onStopClick);
let timerId = null;
let isActive = false;

function onStartClick() {
  if (isActive) {
    return;
  }
  timerId = setInterval(changeBodyColor, 1000);
}

function onStopClick() {
  clearInterval(timerId);
  isActive = false;
}

function changeBodyColor() {
  isActive = true;
  const color = getRandomHexColor();
  refs.bodyEl.style.backgroundColor = color;
  console.log((refs.bodyEl.style.backgroundColor = color));
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

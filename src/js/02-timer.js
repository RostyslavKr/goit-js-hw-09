import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let userDate = null;
refs.startBtn.setAttribute('disabled', true);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates[0] <= options.defaultDate
      ? alert('Please choose a date in the future')
      : refs.startBtn.removeAttribute('disabled');
    userDate = selectedDates[0];
    console.log(selectedDates[0]);
  },
};
flatpickr(refs.input, options);

class Timer {
  constructor({ onTick, userDate }) {
    this.timerId = null;
    this.isActive = null;
    this.onTick = onTick;
  }

  start() {
    // if (this.isActive) {
    //   return;
    // }
    // this.isActive = true;
    refs.input.setAttribute('disabled', true);

    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = userDate - currentTime;
      if (deltaTime <= 0) {
        return;
      }

      const data = convertMs(deltaTime);

      this.onTick(data);
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
    refs.input.removeAttribute('disabled');
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const timer = new Timer({
  onTick: updateClockFace,
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(`${days}`);
  refs.hours.textContent = addLeadingZero(`${hours}`);
  refs.minutes.textContent = addLeadingZero(`${minutes}`);
  refs.seconds.textContent = addLeadingZero(`${seconds}`);
}

refs.startBtn.addEventListener('click', timer.start.bind(timer));

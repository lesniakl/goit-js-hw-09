import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const counterDays = document.querySelector('span[data-days]');
const counterHours = document.querySelector('span[data-hours]');
const counterMinutes = document.querySelector('span[data-minutes]');
const counterSeconds = document.querySelector('span[data-seconds]');

const picker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

let selected = 0;
let timerId = null;
let timeLeft = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkDate(selectedDates[0].getTime());
  },
};

const pickerInstance = flatpickr(picker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function checkDate(selectedDate) {
  const currentDate = new Date().getTime();
  if (selectedDate <= currentDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
  startBtn.removeAttribute('disabled');
  selected = selectedDate;
  startBtn.addEventListener('click', startCb);
}

function startCb(e) {
  const currentDate = new Date().getTime();
  startBtn.toggleAttribute('disabled');
  startBtn.removeEventListener('click', startCb);
  if (selected <= currentDate) {
    Notiflix.Notify.failure(
      'Timer has already expired, please choose another date'
    );
    return;
  }
  picker.toggleAttribute('disabled');
  timeLeft = selected - currentDate;
  timerId = setInterval(updateUI, 1000);
}

function updateUI() {
  if (timeLeft <= 0) {
    Notiflix.Notify.success('Timer has reached its goal!');
    picker.toggleAttribute('disabled');
    clearInterval(timerId);
    return;
  }
  const convertedTime = convertMs(timeLeft);
  counterDays.textContent = addLeadingZero(convertedTime.days);
  counterHours.textContent = addLeadingZero(convertedTime.hours);
  counterMinutes.textContent = addLeadingZero(convertedTime.minutes);
  counterSeconds.textContent = addLeadingZero(convertedTime.seconds);
  timeLeft -= 1000;
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

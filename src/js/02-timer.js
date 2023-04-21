import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    inputData: document.getElementById('datetime-picker'),
    btnStartTimer: document.querySelector('[data-start]'),
    timer: document.querySelector('.timer'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

const date = new Date();
const objectDate = {};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    validationDate(selectedDates[0]);
      },
};

refs.inputData.style.color = "blue";
refs.timer.style.display = "flex";
refs.timer.style.gap = "20px";
refs.timer.style.color = "tomato";

refs.btnStartTimer.setAttribute('disabled', '');

refs.btnStartTimer.addEventListener('click', onStartTimer);

function validationDate(enteredDate) {
     if ((enteredDate - date) <= 0) {
        Notify.failure('Please choose a date in the future');
        return;
      } 
    refs.btnStartTimer.removeAttribute('disabled');
    refs.btnStartTimer.style.color = "purple"
    objectDate.finalDate = enteredDate;
}

function onStartTimer(e) {
    const objectFinalDate = objectDate.finalDate;

    refs.btnStartTimer.setAttribute('disabled', '');
    refs.inputData.setAttribute('disabled', '');
    refs.btnStartTimer.style.color = "green";
    refs.inputData.style.color = "orange";

    const idInterval = setInterval(() => {
        const currentDate = new Date();
        const deltaTimer = objectFinalDate - currentDate;
        const timerObject = convertMs(deltaTimer);      
        renderingTimer(timerObject);

        if (deltaTimer <= 1000) {
            clearInterval(idInterval);
            Notify.success('Time is up!');

            refs.inputData.removeAttribute('disabled');
            refs.inputData.style.color = "pink";
            return;
        }
    }, 1000);
}

function renderingTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
    }

function convertMs(ms) {
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

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

flatpickr(refs.inputData, options);
const refs = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
   }

let intervalId = null;
   
refs.btnStart.addEventListener('click', startChangeColor);
refs.btnStop.addEventListener('click', stopChangeColor);

function startChangeColor(event) {
    refs.body.style.background = getRandomHexColor();
    intervalId = setInterval(() => {
        refs.body.style.background = getRandomHexColor()
    }, 1000);
    refs.btnStart.setAttribute('disabled', '');
}

function stopChangeColor(event) {
    refs.btnStart.removeAttribute('disabled');
    clearInterval(intervalId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
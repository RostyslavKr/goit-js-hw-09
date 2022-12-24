import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', promiseShow);

function promiseShow(e) {
  e.preventDefault();
  const formEl = event.currentTarget.elements;
  const amount = Number(formEl.amount.value);
  let delay = Number(formEl.delay.value);
  const step = Number(formEl.step.value);

  for (let position = 1; position <= amount; position += 1) {
    refs.form.reset();
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

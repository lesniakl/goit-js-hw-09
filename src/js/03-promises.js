import Notiflix from 'notiflix';

const generator = document.querySelector('.form');

generator.addEventListener('submit', generate);

function generate(e) {
  e.preventDefault();
  const delay = parseInt(document.querySelector("input[name='delay']").value);
  const step = parseInt(document.querySelector("input[name='step']").value);
  const amount = parseInt(document.querySelector("input[name='amount']").value);
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay + step * (i - 1))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({ position: position, delay: delay });
      }, delay);
    });
    return promise;
  } else {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject({ position: position, delay: delay });
      }, delay);
    });
    return promise;
  }
}

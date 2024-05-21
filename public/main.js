// USE WITH FIREBASE AUTH
// import ViewDirectorBasedOnUserAuthStatus from '../utils/viewDirector';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';

// targeting elements of the DOM
const jokeButton = document.querySelector('#joke-btn');
const jokeSetupDiv = document.querySelector('#joke-setup-div');
const jokeDeliveryDiv = document.querySelector('#joke-delivery-div');

// function that starts the app
const init = () => {
  jokeButton.innerHTML = 'Get a Joke';
};

init();

// Joke API endpoint
const endpoint = 'https://v2.jokeapi.dev/joke/Any?safe-mode&type=twopart';

// promise for getting a joke from the API
const getJoke = () => new Promise((resolve, reject) => {
  fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// declaring jokeDelivery outside of the jokeOnDom function
let jokeDelivery = '';

const jokeOnDom = () => {
  if (jokeButton.innerHTML === 'Get a Joke' || jokeButton.innerHTML === 'Get Another Joke') {
    jokeSetupDiv.innerHTML = '';
    jokeDeliveryDiv.innerHTML = '';
    getJoke().then((data) => {
      jokeSetupDiv.innerHTML = data.setup;
      jokeDelivery = data.delivery;
    });
    jokeButton.innerHTML = 'Get Punchline';
  } else {
    jokeDeliveryDiv.innerHTML += `<br><br> ${jokeDelivery}`;
    jokeButton.innerHTML = 'Get Another Joke';
  }
};

// event listener for the jokeButton
jokeButton.addEventListener('click', jokeOnDom);

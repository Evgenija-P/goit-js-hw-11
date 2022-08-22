const axios = require('axios').default;
const axios = require('axios');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');

const url = `https://pixabay.com/api/`;
const API_KEY = `key=29432031-54944c319385602ed128077f3`;
const urlOptions = `image_type=photo&orientation=horizontal&safesearch=true`


const input = document.querySelector(`input`);
const form = document.querySelector('.search-form');
const countryConteiner = document.querySelector(`.country-info`);

form.addEventListener(`submit`, onSearch);

// function onSearch(event) {
//     event.preventDefault();
//     var seachCountry = input.value;
//     console.log(seachCountry);
  
//     fetchCountries(seachCountry)
//       .then(console.log)
//       .catch(error => {
//         Notify.failure('Oops, there is no country with that name');
//       });
//   }

// function fetchCountries(name) {
//     return axios.get(`${url}?${API_KEY}&q=${name}&${urlOptions}`).then(response => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json();
//     });
//   }

axios.get(`${url}?${API_KEY}&q=${name}&${urlOptions}`)
  .then(response => console.log(response));
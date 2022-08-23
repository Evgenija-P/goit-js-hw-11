// const axios = require('axios').default;
// import { onFindAll } from './js/onFindAll.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';

const input = document.querySelector(`input`);
const form = document.querySelector('.search-form');
const galleryConteiner = document.querySelector(`.gallery`);
const axios = require('axios');

const url = `https://pixabay.com/api/`;
const API_KEY = `key=29432031-54944c319385602ed128077f3`;
const urlOptions = `image_type=photo&orientation=horizontal&safesearch=true`;

function onFindAll(name) {
  return axios
    .get(`${url}?${API_KEY}&q=${name}&${urlOptions}`)
    .then(function (response) {
      console.log(response.data);
      // console.log(response.data.hits);
      // console.log(response.data.totalHits);

      // if (!response.ok) {
      //   throw new Error(response.statusText);
      // }
      return response.data;
    });
}

form.addEventListener(`submit`, onSearch);

function onSearch(event) {
  event.preventDefault();
  var seachText = input.value;
  console.log(seachText);
  listCleaner();

  onFindAll(seachText)
    .then(onBildImage)
    .catch(error => {
      // Notify.failure('Oops, there is no country with that name');
    });
}

function onBildImage(data) {
  listImagAll(data);
}

function listImagAll(data) {
  console.log(`listImagAll`);
  const image = data.hits;
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  if (image.length !== 0) {
    const markList = image
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `<div class="photo-card">
          <a class="gallery__item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" class="gallery__image" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div>`;
        }
      )
      .join('');
    galleryConteiner.insertAdjacentHTML('afterbegin', markList);
  } else {
    Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function listCleaner() {
  galleryConteiner.innerHTML = '';
}

// var lightbox = new SimpleLightbox('.gallery a', {
//   captions: true,
//   captionsData: 'alt',
//   captionPosition: 'bottom',
//   captionDelay: 250,
// });
let gallery = new SimpleLightbox('.gallery a');

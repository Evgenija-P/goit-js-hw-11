import { onFindAll } from './js/onFindAll.js';
// import { makeGallary } from './js/makeGallary.js';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';

var lightbox = new SimpleLightbox('.gallery a');
const input = document.querySelector(`input`);
const form = document.querySelector('.search-form');
const galleryConteiner = document.querySelector(`.gallery`);

form.addEventListener(`submit`, onSearch);

function onSearch(event) {
  event.preventDefault();
  var seachText = input.value;
  listCleaner();

  onFindAll(seachText)
    .then(makeGallary)
    .catch(error => {
      // Notify.failure('Oops, there is no country with that name');
    });
}

// function onBildImage(data) {
//   makeGallary(data);
// }

export function makeGallary(data) {
  // console.log(data.hits)
  const galleryConteiner = document.querySelector(`.gallery`);
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

// const galleryImages = galleryItems
//   .map(
//     item =>
//       `<a class="gallery__item" href="${item.original}">
//   <img class="gallery__image" 
//   src="${item.preview}" 
//   alt="${item.description}" />
// </a>`
//   )
//   .join('');

  function listCleaner() {
    galleryConteiner.innerHTML = '';
  }
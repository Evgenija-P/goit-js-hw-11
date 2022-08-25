import { onFindAll } from './js/onFindAll.js';
// import { makeGallary } from './js/makeGallary.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';

let gallery = new SimpleLightbox('.gallery a');
const input = document.querySelector(`input`);
const form = document.querySelector('.search-form');
const galleryConteiner = document.querySelector(`.gallery`);
const btnMore = document.querySelector('.load-more');

var page = 1;
var perPage = 40;

form.addEventListener(`submit`, onSearch);
btnMore.addEventListener(`click`, onLoadMore);

function onSearch(event) {
  event.preventDefault();
  var seachText = input.value;
  if (seachText !== '') {
    listCleaner();
    onLoadMoreBtnHidden();
    gallery.refresh();

    onFindAll(seachText, page, perPage)
      .then(makeGallary)
      .catch(error => {
        // Notify.failure('Oops, there is no country with that name');
      });
  } else Notiflix.Notify.failure(`Oops, you didn't enter a request`);
}

export function makeGallary(data) {
  const image = data.hits;
  const lastPage = Math.ceil(data.totalHits / perPage);

  if (image.length !== 0) {
    if (page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      onLoadMoreBtnShow();
    } else if (page === lastPage) {
      onLoadMoreBtnHidden();
      Notiflix.Notify.success(
        `We're sorry, but you've reached the end of search results.`
      );
    }
    createGallery(image);
  } else {
    Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function listCleaner() {
  galleryConteiner.innerHTML = '';
  page = 1;
}

function onLoadMoreBtnShow() {
  btnMore.classList.remove('is-hidden');
}

function onLoadMoreBtnHidden() {
  btnMore.classList.add('is-hidden');
}

function onLoadMore() {
  page += 1;
  onLoadMoreBtnShow();
  scroll();
  onFindAll(input.value, page, perPage)
    .then(makeGallary)
    .catch(error => {
      // Notify.failure('Oops, there is no country with that name');
    });
}

function createGallery(image) {
  const galleryConteiner = document.querySelector(`.gallery`);
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
  galleryConteiner.insertAdjacentHTML('beforeend', markList);
}

function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

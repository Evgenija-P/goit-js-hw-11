import { onFindAll } from './js/onFindAll.js';
import { createGallery } from './js/render.js';
import './css/index.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';

const input = document.querySelector(`input`);
const form = document.querySelector(`.search-form`);
const galleryConteiner = document.querySelector(`.gallery`);
const btnMore = document.querySelector(`.load-more`);

var page = 1;
var perPage = 40;
var lightbox = new SimpleLightbox('.gallery a');

form.addEventListener(`submit`, onSearch);
btnMore.addEventListener(`click`, onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  var seachText = input.value;
  if (seachText !== '') {
    listCleaner();
    onLoadMoreBtnHidden();

    const data = await onFindAll(seachText, page, perPage);
    makeGallary(data);
  } else Notiflix.Notify.failure(`Oops, you didn't enter a request`);
}

function makeGallary(data) {
  const image = data.hits;
  const lastPage = Math.ceil(data.totalHits / perPage);

  if (image.length !== 0) {
    if (page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      onLoadMoreBtnShow();
      if (page === lastPage) {
        onLoadMoreBtnHidden();
      }
    } else if (page === lastPage) {
      onLoadMoreBtnHidden();
      Notiflix.Notify.success(
        `We're sorry, but you've reached the end of search results.`
      );
    }
    createGallery(image);
    listCleaner;
  } else {
    Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

async function onLoadMore() {
  page += 1;
  scroll();
  onLoadMoreBtnShow();

  const data = await onFindAll(input.value, page, perPage);
  makeGallary(data);
  lightbox.refresh();
}

function listCleaner() {
  galleryConteiner.innerHTML = '';
  page = 1;
}

function onLoadMoreBtnShow() {
  btnMore.classList.remove(`is-hidden`);
}

function onLoadMoreBtnHidden() {
  btnMore.classList.add(`is-hidden`);
}

function scroll() {
  const { height: cardHeight } =
    galleryConteiner.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 5,
    behavior: 'smooth',
  });
}

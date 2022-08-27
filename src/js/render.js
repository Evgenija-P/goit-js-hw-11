export function createGallery(image) {
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
  var lightbox = new SimpleLightbox('.gallery a');
}

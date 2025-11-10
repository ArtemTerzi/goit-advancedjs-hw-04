import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPhotosByQuery } from './js/pixabay-api';
import { createGalleryMarkup } from './js/render-functions';

const refs = {
  galleryEl: document.querySelector('.gallery'),
  inputEl: document.querySelector('.form-input'),
  formEl: document.querySelector('.form'),
  loaderEl: document.querySelector('.loader'),
  loadMoreBtnEl: document.querySelector('.load-more-button'),
};

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  animationSpeed: 250,
  scrollZoom: false,
});

const toastConfig = {
  title: 'Error',
  message:
    'Sorry, there are no images matching your search query. Please try again!',
  position: 'topRight',
};

const searchParams = {
  page: 1,
  q: '',
  per_page: 15,
};

const toggleLoader = () => refs.loaderEl.classList.toggle('is-active');
const hideLoadMoreBtn = () => refs.loadMoreBtnEl.classList.add('is-hidden');
const showLoadMoreBtn = () => refs.loadMoreBtnEl.classList.remove('is-hidden');

const getAndRenderPhotos = async (isLoadMore = false) => {
  toggleLoader();

  try {
    const { data } = await getPhotosByQuery(searchParams);

    const totalPages = Math.ceil(data.totalHits / searchParams.per_page);

    if (!data.hits.length) {
      throw new Error(toastConfig.message);
    }

    const markup = createGalleryMarkup(data.hits);
    if (isLoadMore) {
      refs.galleryEl.insertAdjacentHTML('beforeend', markup);
    } else {
      refs.galleryEl.innerHTML = markup;
    }

    gallery.refresh();

    if (searchParams.page >= totalPages) {
      hideLoadMoreBtn();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreBtn();
    }

    searchParams.page++;

    if (isLoadMore) {
      const scrollHeight =
        document.querySelector('.gallery-item').getBoundingClientRect().width *
        2;
      scrollBy({ top: scrollHeight, behavior: 'smooth' });
    }
  } catch (err) {
    iziToast.error(toastConfig);
    hideLoadMoreBtn();
    console.error(err);
  } finally {
    toggleLoader();
  }
};

const onSearchFormSubmit = e => {
  e.preventDefault();
  searchParams.page = 1;
  searchParams.q = refs.inputEl.value.trim();
  refs.inputEl.value = '';
  refs.galleryEl.innerHTML = '';
  hideLoadMoreBtn();

  if (!searchParams.q) {
    iziToast.error(toastConfig);
    return;
  }

  getAndRenderPhotos(false);
};

const onLoadMoreButtonClick = () => getAndRenderPhotos(true);

refs.formEl.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreButtonClick);

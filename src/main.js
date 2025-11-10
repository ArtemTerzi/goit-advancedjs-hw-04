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

const toggleLoader = () => refs.loaderEl.classList.toggle('is-active');

const searchParams = {
  page: 1,
  q: '',
  per_page: 15,
};

const onSearchFormSubmit = async e => {
  e.preventDefault();
  refs.galleryEl.innerHTML = '';
  toggleLoader();

  searchParams.page = 1;
  searchParams.q = refs.inputEl.value.trim();
  refs.inputEl.value = '';

  if (searchParams.q.length === 0) {
    iziToast.error(toastConfig);
    toggleLoader();
    return;
  }

  try {
    const { data } = await getPhotosByQuery(searchParams);

    if (data.hits.length === 0) throw new Error(toastConfig.message);

    const totalPages = Math.ceil(data.totalHits / searchParams.per_page);

    if (searchParams.page === totalPages) {
      refs.loadMoreBtnEl.classList.add('is-hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      refs.loadMoreBtnEl.classList.remove('is-hidden');
    }

    searchParams.page++;
    refs.galleryEl.innerHTML = createGalleryMarkup(data.hits);
    gallery.refresh();
  } catch (err) {
    iziToast.error(toastConfig);
    refs.loadMoreBtnEl.classList.add('is-hidden');
    console.dir(err);
  } finally {
    toggleLoader();
  }
};

const onLoadMoreButtonClick = async () => {
  toggleLoader();
  try {
    const { data } = await getPhotosByQuery(searchParams);

    const totalPages = Math.ceil(data.totalHits / searchParams.per_page);

    if (searchParams.page === totalPages) {
      refs.loadMoreBtnEl.classList.add('is-hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      refs.loadMoreBtnEl.classList.remove('is-hidden');
    }

    if (data.hits.length === 0) {
      refs.loadMoreBtnEl.classList.add('is-hidden');
      refs.loadMoreBtnEl.removeEventListener('click', onLoadMoreButtonClick);

      return;
    }

    searchParams.page++;
    const markup = createGalleryMarkup(data.hits);
    refs.galleryEl.insertAdjacentHTML('beforeend', markup);
    gallery.refresh();

    const scrollHeight =
      document.querySelector('.gallery-item').getBoundingClientRect().width * 2;

    scrollBy({
      top: scrollHeight,
      behavior: 'smooth',
    });
  } catch (err) {
    iziToast.error(toastConfig);
    refs.loadMoreBtnEl.classList.add('is-hidden');
    console.dir(err);
  } finally {
    toggleLoader();
  }
};

refs.formEl.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreButtonClick);

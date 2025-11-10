import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api/?`;

export const getPhotosByQuery = ({ q, page = 1, per_page = 15 }) => {
  const params = new URLSearchParams({
    key: '33730392-00e87f60b0c2dabc7d687ed2e',
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page,
    page,
  });

  return axios.get('', { params });
};

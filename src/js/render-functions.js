export const createGalleryMarkup = array => {
  return array.reduce(
    (
      acc,
      { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
    ) =>
      acc +
      `
      <li class="gallery-item">
        <a class="gallery-link" href=${largeImageURL}>
          <img
            class="gallery-image"
            src=${webformatURL}
            alt=${tags}
          />
        <ul class="item-details">
            <li class="item-detail">
              <p>Likes</p>
              <span>${likes}</span>
            </li>
            <li class="item-detail">
              <p>Views</p>
              <span>${views}</span>
            </li>
            <li class="item-detail">
              <p>Comments</p>
              <span>${comments}</span>
            </li>
            <li class="item-detail">
              <p>Downloads</p>
              <span>${downloads}</span>
            </li>
        </ul>
        </a>
      </li>`,
    ''
  );
};

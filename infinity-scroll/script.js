const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

const count = 10;
const apiKey = '4tX7vmlcWA6dLPE7z9gavtxX6F5u6E3pIKXh5qfh1Es';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
  }
}
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    getPhotos();
    console.log('load more');
  }
});

getPhotos();

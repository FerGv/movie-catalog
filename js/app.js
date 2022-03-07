const API_URL = 'http://www.omdbapi.com';
const API_KEY = 'af5566e9';

const searchInput = document.querySelector('#search');
const titleList = document.querySelector('#title-list');

const searchMovie = () => {
  const search = searchInput.value;
  fetch(`${API_URL}?apikey=${API_KEY}&s=${search}`)
    .then((response) => response.json())
    .then((json) => {
      const { Search: results } = json;
      titleList.innerHTML = '';
      results.forEach(({ Title: title }) => {
        titleList.insertAdjacentHTML('beforeend', `<li>${title}</li>`);
      });
    })
    .catch((error) => console.error(error));
};

searchInput.addEventListener('keyup', searchMovie);

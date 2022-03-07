const API_URL = new URL('http://www.omdbapi.com');
const API_KEY = 'af5566e9';

const searchInput = document.querySelector('#search');
const titleList = document.querySelector('#title-list');

const searchMovie = async () => {
  try {
    const search = searchInput.value;
    titleList.innerHTML = '';

    if (!search) return;
    if (search?.length < 3) {
      titleList.insertAdjacentHTML('beforeend', '<li>Escribe mínimo 3 letras</li>');
      return;
    }

    const params = new URLSearchParams({ apikey: API_KEY, s: search });
    API_URL.search = params.toString();
    const response = await fetch(API_URL);
    const json = await response.json();
    const { Search: results } = json;

    if (!results) {
      titleList.insertAdjacentHTML('beforeend', '<li>No se encontraron resultados</li>');
      return;
    }

    results.forEach(({ Poster: poster, Title: title }) => {
      titleList.insertAdjacentHTML(
        'beforeend',
        `
          <li>
            ${title}
            <img src="${poster}" alt="${title}" />
          </li>
        `,
      );
    });
  } catch (error) {
    console.error(error);
  }
};

searchInput.addEventListener('keyup', searchMovie);

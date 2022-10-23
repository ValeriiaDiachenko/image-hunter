export default class QueryAPI {
  #searchQuery;
  #page;

  constructor() {
    this.#searchQuery = '';
    this.#page = 1;
    this.perPage = 40;
  }

  async fetchImgs() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '30747871-d91efdefadb63ca506ce75120';
    const params = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: this.perPage,
      page: this.page,
    });

    const url = `${BASE_URL}?${params}`;

    this.#incrementPage();
    const response = await fetch(url);
    const data = await this.#onFetch(response);
    return data;
  }

  getFetchedElsNum() {
    return this.perPage * (this.page - 1);
  }

  setSearchQuery(newSearchQuery) {
    this.searchQuery = newSearchQuery;
    this.#resetPage();
  }

  #onFetch(response) {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  }

  #resetPage() {
    this.page = 1;
  }

  #incrementPage() {
    this.page += 1;
  }
}

const LoTR_API_KEY = "zdciuWuUveAQkLfroNNm";
const LoTR_API_URL = "https://the-one-api.dev/v2/character";
let resultsOffset = 0;
let pageLimit = 10;

class DOM {
  constructor() {
    this.characterContainer = document.querySelector(".characterContainer");
    this.form = document.querySelector("form");
    this.character = document.querySelector("#character");
    this.searchBtn = document.querySelector("#searchBtn");
    this.prevBtn = document.querySelector("#prev");
    this.nextBtn = document.querySelector("#next");
    this.pagination = document.querySelector(".pagination");
    this.allBtn = document.querySelector("#allBtn");
  }

  updateCharacters(list) {
    this.characterContainer.innerHTML = "";

    if (list.length == 0) {
      list.push({ name: "No Search Results" });
    }

    for (let char of list) {
      let p = document.createElement("p");
      p.textContent = char.name;
      this.characterContainer.appendChild(p);
    }
  }

  toggleSearchBtn(e) {
    if (e.target.value.trim().length < 1) {
      this.searchBtn.disabled = true;
    } else this.searchBtn.disabled = false;
  }

  updatePage(offset) {
    console.log(offset);
    resultsOffset = offset;

    this.fetchCharacters();
  }

  searchCharacter(e) {
    e.preventDefault();

    console.log(this.character.value);
    this.fetchCharacters(this.character.value);

    this.character.value = "";
  }

  async fetchCharacters(name) {
    try {
      let LoTR_FULL_URL = `${LoTR_API_URL}?limit=${pageLimit}&offset=${resultsOffset}${
        name ? `&name=${name}` : ""
      }`;
      let res = await fetch(LoTR_FULL_URL, {
        mode: "cors",
        headers: {
          Authorization: "Bearer " + LoTR_API_KEY,
        },
      });

      let data = await res.json();
      console.log(data);

      this.updateCharacters(data.docs);

      this.updatePagination(data.total);
    } catch (e) {
      console.error(e);
    }
  }

  updatePagination(total) {
    this.pagination.innerHTML = "";

    let pages = Math.floor(total / 10);
    let currentPage = resultsOffset / 10;
    let rangeStart = currentPage - 5 < 0 ? 0 : currentPage - 5;
    let rangeEnd = rangeStart + 10 > pages - 1 ? pages : rangeStart + 10;

    for (let i = rangeStart; i < rangeEnd; i++) {
      console.log(i);
      let a = document.createElement("a");
      a.classList.add("pagination-item");
      if (i == currentPage) {
        a.classList.add("active-pagination-item");
      }
      a.textContent = i + 1;
      a.ariaLabel = "View results page " + (i + 1);
      a.href = "#";
      a.addEventListener("click", () => this.updatePage(i * 10));
      this.pagination.appendChild(a);
    }
  }
}

export default new DOM();

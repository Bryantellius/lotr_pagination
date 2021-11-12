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
  }

  updateCharacters(list) {
    this.characterContainer.innerHTML = "";

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

  updatePagination(offset) {
    resultsOffset += offset;

    if (offset > 0) {
      this.prevBtn.disabled = false;
    }

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
    } catch (e) {
      console.error(e);
    }
  }
}

export default new DOM();

import DOM from "./utils/dom";

DOM.fetchCharacters();

DOM.character.addEventListener("keyup", (e) => DOM.toggleSearchBtn(e));
DOM.form.addEventListener("submit", (e) => DOM.searchCharacter(e));
DOM.allBtn.addEventListener("click", (e) => DOM.fetchCharacters());

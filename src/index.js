import DOM from "./utils/dom";

DOM.fetchCharacters();

DOM.character.addEventListener("keyup", (e) => DOM.toggleSearchBtn(e));
DOM.prevBtn.addEventListener("click", () => DOM.updatePagination(-10));
DOM.nextBtn.addEventListener("click", () => DOM.updatePagination(10));
DOM.form.addEventListener("submit", (e) => DOM.searchCharacter(e));

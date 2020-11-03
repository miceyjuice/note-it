class Note {
  constructor() {
    console.log(window.location.pathname);
    if (window.location.pathname == "/index.html") {
      this.notesCount = this.getCountOfNotes();
      this.createNoteBoard();
      this.getCountOfNotes();
    } else if (window.location.pathname == "/addnote.html") {
      this.getDataFromForm();
    }
  }

  setCountOfNotes(numberOfNotes) {
    let noteCounter = parseInt(numberOfNotes);
    noteCounter = +1;
    localStorage.setItem("notesCount", noteCounter);
  }

  getDataFromForm() {
    const addBtn = document.querySelector(".newNoteView__buttons__add");
    addBtn.addEventListener("click", () => {
      const title = document.querySelector(".newNoteView__info__title__input")
        .value;
      const description = document.querySelector(
        ".newNoteView__info__description__input"
      ).value;
      const tags = document.querySelector(".newNoteView__info__tags__input")
        .value;
      if (title == "" || description == "" || tags == "") {
        return console.log("Wypelnij pola");
      } else {
        this.createNote(new Date(), title, description, tags);
        window.open("index.html", "_self");
      }
    });
  }

  addingNoteView() {
    window.open("addnote.html", "_self");
  }

  changeView() {
    const mainContainer = document.querySelector(".mainNotesView__list");
    const content = `
      <div class="mainNotesView__list__noNotes">
        <div class="mainNotesView__list__noNotes__box">
          <div class="mainNotesView__list__noNotes__box__img"></div>
          <h2 class="mainNotesView__list__noNotes__box__alert">
            You have no notes
          </h2>
          <button class="mainNotesView__topBar__addNote__button noNotesBtn">
            <div class="mainNotesView__topBar__addNote__button__icon"></div>
            Add a note
          </button>
        </div>
      </div>
    `;

    document.querySelector(".mainNotesView__topBar__addNote").style.visibility =
      "hidden";

    mainContainer.innerHTML = content;
    document.querySelector(".noNotesBtn").addEventListener("click", () => {
      this.addingNoteView();
    });
  }

  getCountOfNotes() {
    if (localStorage.getItem("notesCount") == null) {
      localStorage.setItem("notesCount", 0);
      console.log(1);
      return 0;
    } else if (localStorage.getItem("notesCount") == 0) {
      //this.changeView();
      console.log(2);
    } else {
      console.log(3);
      return localStorage.getItem("notesCount");
    }
  }

  getAllNotes() {
    const localStorageLength = localStorage.length - 1;
    const notes = [];

    for (let i = 0; i < localStorageLength; i++) {
      notes.push(localStorage.getItem(`note${i}`));
    }
    console.log(localStorageLength);
    return notes;
  }

  createNote(noteDate, noteTitle, noteDescription, noteTags) {
    const note = {
      title: noteTitle,
      description: noteDescription,
      tags: noteTags,
      date: noteDate,
    };
    localStorage.setItem(`note${this.getCountOfNotes()}`, JSON.stringify(note));
    this.setCountOfNotes(this.getCountOfNotes());
  }

  createNoteBox(data) {
    const noteBox = document.createElement("div");
    noteBox.classList.add("mainNotesView__list__noteBox");

    console.log(data);
    const dataParsed = JSON.parse(data);
    console.log(dataParsed);
    let content = `
    <p class="mainNotesView__list__noteBox__date">${dataParsed.date}</p>
    <h4 class="mainNotesView__list__noteBox__title">${dataParsed.title}</h4>
    <p class="mainNotesView__list__noteBox__description">${dataParsed.description}</p>
    <p class="mainNotesView__list__noteBox__tags">${dataParsed.tags}</p>
    <div class="mainNotesView__list__noteBox__options">
      <div class="mainNotesView__list__noteBox__options__edit"></div>
      <div class="mainNotesView__list__noteBox__options__pin"></div>
      <div class="mainNotesView__list__noteBox__options__delete"></div>
      <div class="mainNotesView__list__noteBox__options__check"></div>
    </div>
    `;

    noteBox.innerHTML = content;
    return noteBox;
  }

  createNoteBoard() {
    const notes = this.getAllNotes();
    console.log(notes);
    const board = document.querySelector(".mainNotesView__list");

    for (let i = 0; i < notes.length; i++) {
      board.appendChild(this.createNoteBox(notes[i]));
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const dupa = new Note();
  dupa.createNote(
    "10.02.2020",
    "Najlepszy tytuł",
    "To jest kontent nie do odrzucenia. To jest kontent nie do odrzucenia. To jest kontent nie do odrzucenia. To jest kontent nie do odrzucenia.",
    "ważne, nieważne, super, duperka"
  );
});

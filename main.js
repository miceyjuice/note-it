class Note {
  constructor() {
    if (
      window.location.pathname == "/index.html" ||
      window.location.pathname == "/"
    ) {
      this.notesCount = this.getCountOfNotes();
      this.createNoteBoard();
      this.deleteNote();
      this.addingNoteView();
    } else if (window.location.pathname == "/addnote.html") {
      this.getDataFromForm();
    }
  }

  setCountOfNotes(numberOfNotes) {
    let noteCounter = parseInt(numberOfNotes);
    noteCounter += 1;
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
    if (
      window.location.pathname == "/" ||
      window.location.pathname == "/index.html"
    ) {
      if (this.getCountOfNotes() == 0) {
        document.querySelector(".noNotesBtn").addEventListener("click", () => {
          window.open("addnote.html", "_self");
        });
      } else {
        document.querySelector(".topBtn").addEventListener("click", () => {
          window.open("addnote.html", "_self");
        });
      }
    }
  }

  changeView() {
    if (
      window.location.pathname == "/" ||
      window.location.pathname == "/index.html"
    ) {
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

      document.querySelector(
        ".mainNotesView__topBar__addNote"
      ).style.visibility = "hidden";

      mainContainer.innerHTML = content;
      // this.addingNoteView();
    }
  }

  getCountOfNotes() {
    if (localStorage.getItem("notesCount") == null) {
      this.changeView();
      localStorage.setItem("notesCount", 0);
      return 0;
    } else if (localStorage.getItem("notesCount") == 0) {
      this.changeView();
      return 0;
    } else {
      return localStorage.getItem("notesCount");
    }
  }

  getAllNotes() {
    const localStorageLength = localStorage.length - 1;
    const notes = [];

    for (let i = 0; i < localStorageLength; i++) {
      notes.push(localStorage.getItem(`note${i}`));
    }
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

  createNoteBox(data, itemNumber) {
    const noteBox = document.createElement("div");
    noteBox.classList.add("mainNotesView__list__noteBox");

    const dataParsed = JSON.parse(data);
    let content = `
    <p class="mainNotesView__list__noteBox__date">${dataParsed.date}</p>
    <h4 class="mainNotesView__list__noteBox__title">${dataParsed.title}</h4>
    <p class="mainNotesView__list__noteBox__description">${dataParsed.description}</p>
    <p class="mainNotesView__list__noteBox__tags">${dataParsed.tags}</p>
    <div class="mainNotesView__list__noteBox__options">
      <div class="mainNotesView__list__noteBox__options__edit"></div>
      <div class="mainNotesView__list__noteBox__options__pin"></div>
      <div class="mainNotesView__list__noteBox__options__delete" data-key="${itemNumber}"></div>
      <div class="mainNotesView__list__noteBox__options__check"></div>
    </div>
    `;

    noteBox.innerHTML = content;
    return noteBox;
  }

  deleteNote() {
    if (this.getCountOfNotes() > 0) {
      const deleteBtn = document.querySelectorAll(
        ".mainNotesView__list__noteBox__options__delete"
      );

      for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", () => {
          localStorage.removeItem(`note${deleteBtn[i].dataset.key}`);
          this.redrawNotes(i);
        });
      }
    }
  }

  redrawNotes(keyOfNote) {
    const notes = this.getAllNotes();
    const countOfNotes = notes.length;
    console.log(countOfNotes);
    console.log(notes);
    console.log(keyOfNote);
    localStorage.clear();
    this.setCountOfNotes(-1);
    for (let i = 0; i < notes.length - 1; i++) {
      const note = JSON.parse(notes[i]);
      localStorage.setItem(
        `note${this.getCountOfNotes()}`,
        JSON.stringify(note)
      );
      this.setCountOfNotes(this.getCountOfNotes());
      console.log(note);
    }
    window.location.reload();
  }

  createNoteBoard() {
    const notes = this.getAllNotes();
    const board = document.querySelector(".mainNotesView__list");

    for (let i = 0; i < notes.length; i++) {
      board.appendChild(this.createNoteBox(notes[i], i));
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const dupa = new Note();
  // dupa.createNote(
  //   "10.02.2020",
  //   "Najlepszy tytuł",
  //   "To jest kontent nie do odrzucenia. To jest kontent nie do odrzucenia. To jest kontent nie do odrzucenia. To jest kontent nie do odrzucenia.",
  //   "ważne, nieważne, super, duperka"
  // );
});

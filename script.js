
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    let NotesDiv = $('#listNotes');

    function infoNote() {
      let newTitle = $('#newTitle').value.trim();
      let newDesc = $('#newDesc').value.trim();
      let jinfo = {
        title: newTitle,
        desc: newDesc
      };
      return jinfo;
    }

    function createNoteElement({ title, desc }, index) {
      const note = document.createElement('div');
      note.className = 'note';
      note.id = `Note-${index}`;

      const titleDiv = document.createElement('div');
      titleDiv.className = 'note-title';
      titleDiv.textContent = title;

      const descDiv = document.createElement('div');
      descDiv.className = 'note-desc';
      descDiv.textContent = desc;

      const delBtn = document.createElement('div');
      delBtn.className = 'note-delbtn';

      note.appendChild(titleDiv);
      note.appendChild(descDiv);
      note.appendChild(delBtn);

      return note;
    }

    function renderNotes() {
      NotesDiv.innerHTML = '';
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.forEach((note, i) => {
        const noteElement = createNoteElement(note, i);
        NotesDiv.appendChild(noteElement);
      });
    }

    function saveNote() {
      const newNote = infoNote();
      if (!newNote.title || !newNote.desc) {
        alert("Completa ambos campos para guardar la nota.");
        return;
      }

      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.push(newNote);
      localStorage.setItem('notes', JSON.stringify(notes));
      renderNotes();
    }

    function cleanNote() {
      $('#newTitle').value = "";
      $('#newDesc').value = "";
    }

    $('.add').addEventListener("click", () => {
      $('.new').style.display = 'grid';
    });

    $('.cancel').addEventListener("click", () => {
      $('.new').style.display = 'none';
      cleanNote();
    });

    $('.create').addEventListener("click", () => {
      $('.new').style.display = 'none';
      saveNote();
      cleanNote();
    });

    // Renderiza notas al cargar
    window.addEventListener('DOMContentLoaded', renderNotes);
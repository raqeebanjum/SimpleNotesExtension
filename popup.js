let noteTextarea = document.getElementById("note");
let charCounter = document.getElementById("char-counter");

chrome.storage.sync.get(["savedNote"], function(result) {
    if (result.savedNote) {
        noteTextarea.value = result.savedNote;
        adjustHeight(noteTextarea);
        updateCharCounter();
    }
});

noteTextarea.addEventListener("input", function() {
    adjustHeight(noteTextarea);
    updateCharCounter();
    let noteContent = noteTextarea.value;
    chrome.storage.sync.set({ savedNote: noteContent }, function() {
        console.log("Note auto-saved:", noteContent);
    });
});

function adjustHeight(element) {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
}

function updateCharCounter() {
    let currentLength = noteTextarea.value.length;
    charCounter.textContent = `${currentLength} / 1000`;
}
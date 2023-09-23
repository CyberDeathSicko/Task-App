const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const inputValue = inputBox.value.trim(); // Remove leading/trailing whitespace

    if (inputValue === "") {
        alert("You must write something!");
        return; // Exit the function if the input is empty
    }

    const li = createListItem(inputValue);
    listContainer.appendChild(li);

    inputBox.value = "";
    saveData();
}

function createListItem(text) {
    const li = document.createElement("li");
    li.textContent = text;

    const span = document.createElement("span");
    span.innerHTML = "&#10006;";
    span.className = "close";
    span.addEventListener("click", function () {
        li.remove();
        saveData();
    });

    li.appendChild(span);
    return li;
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTasks() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        listContainer.innerHTML = DOMPurify.sanitize(savedData);
    }
}

showTasks();

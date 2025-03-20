let input = document.querySelector("#todo");
let tasksContainer = document.querySelector(".tasks-container");

let toDoList = [];

//Add new task to my list /Új feladat hozzáadása a listához
function addToList() {
  let newTask = input.value;

  if (newTask.trim().length > 0) {
    let newToDo = { task: newTask, checked: false };
    toDoList.push(newToDo);
    input.value = "";
    input.placeholder = "Új feladat hozzáadása";
    input.classList.remove("error");
    renderTasks();
  } else {
    input.placeholder = "Mező kitöltése kötelező!";
    input.classList.add("error");
  }
}

//Render my task and display /feladatok renderelése és megjelenítése
function renderTasks() {
  tasksContainer.innerHTML = "";
  toDoList.forEach((toDo, i) => {
    let template = `<div class="task">
            <label for="task${i}" class="task-label">${toDo.task}</label>
            <input type="checkbox" name="task${i}" id="task${i}" class="task-input" onchange="changeTaskStatus(event)" value=${i} ${
      toDo.checked ? "checked" : ""
    }>
            <span class="icon" onclick="removeTask(event)" data-int=${i}> &#128465;</span>
          </div>`;
    tasksContainer.innerHTML += template;
  });
}

//Change task status  /Feladat státuszának megváltoztatása
function changeTaskStatus(event) {
  let index = event.currentTarget.value;
  toDoList[index].checked = !toDoList[index].checked;
}

//Remove task from my list and rerender /Feladat törlése a listából és újra renderelés
function removeTask(event) {
  let index = event.currentTarget.getAttribute("data-int");
  delete toDoList[index];
  renderTasks();
}

//Save to do linst in localStorage / to do lista mentése a localStorage-ba
function save() {
  let name = document.getElementById("save-as").value;
  name = name.trim().replaceAll(" ", "_");
  localStorage.setItem(name, JSON.stringify(toDoList));
}

//select to do list from localStorage /to do lista kiválasztása localStorage-ból
function openFile() {
  //!! return an array / Visszatérési érték mindig tömb
  let fileContainer = document.getElementsByClassName("file-container")[0];
  fileContainer.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    fileContainer.innerHTML += `<p class="file-name" data-name= ${key} onclick="openSelectedFile(event)">${key}</p>`;
  }
}

//load to do list from localStorage and re-render page /to do lista megnyitása localStorage-ból oldal újra renderelése
function openSelectedFile(event) {
  let fileName = event.currentTarget.getAttribute("data-name");
  toDoList = JSON.parse(localStorage.getItem(fileName));
  renderTasks();
  document.getElementById("popover-load").hidePopover();
}

//Clear localStorage / adatok törlése a localStorageból
function filesClear() {
  localStorage.clear();
}

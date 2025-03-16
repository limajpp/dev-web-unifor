const addTask = function () {
  const taskName = document.getElementById("task-input").value;
  if (taskName === "") {
    alert("Insira um nome de tarefa válido!");
    return;
  }

  const taskList = document.getElementById("task-list");

  const item = document.createElement("li");
  item.classList.add("task");
  item.innerHTML = `
    <span id="span-task" onclick="toggleTask(this)">${taskName}</span>
    <button id="btn-delete-task" onclick="deleteTask(this)" type="button">Delete</button>
  `;

  taskList.appendChild(item);
};

const deleteTask = function (btn) {
  btn.parentElement.remove();
};

const toggleTask = function (span) {
  span.style.setProperty("text-decoration", "solid black line-through 2px");
};

const saveTask = function () {};
const loadTask = function () {};

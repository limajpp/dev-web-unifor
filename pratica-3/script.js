const addTask = function () {
  let taskName = document.getElementById("task-input").value;
  if (taskName === "") {
    alert("O campo de inserção do nome da tarefa está em branco!");
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
  document.getElementById("task-input").value = "";
  saveTask();
};

const deleteTask = function (btn) {
  btn.parentElement.remove();
  saveTask();
};

const toggleTask = function (span) {
  span.classList.toggle("completed");
  saveTask();
};

const saveTask = function () {
  const tasks = [];
  document.querySelectorAll(".task").forEach((task) => {
    tasks.push({
      taskName: task.querySelector("span").innerText,
      status: task.querySelector("span").classList.contains("completed"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTask = function () {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.classList.add("task");
    item.innerHTML = `
    <span class="span-task ${
      task.status ? "completed" : ""
    }" onclick="toggleTask(this)">${task.taskName}</span>
    <button class="btn-delete-task" onclick="deleteTask(this)" type="button">Delete</button>
    `;
    taskList.appendChild(item);
  });
};

document.addEventListener("DOMContentLoaded", loadTask);

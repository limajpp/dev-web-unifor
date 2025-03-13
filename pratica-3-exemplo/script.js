document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

const addTask = function () {
  let taskInput = document.getElementById("taskInput");
  let taskInputText = taskInput.value.trim();

  if (taskInputText === "") {
    alert("Digite uma tarefa válida!");
    return;
  }

  let taskList = document.getElementById("taskList");
  let li = document.createElement("li");
  li.innerHTML = `
    <span onclick="toggleTask(this)">${taskInputText}</span>
    <button class="delete-btn" onclick="deleteTask(this)">X</button>
    `;
  taskList.appendChild(li);
  taskInput.value = "";
  saveTasks();
};

const toggleTask = function (span) {
  span.parentElement.classList.toggle("completed");
  saveTasks();
};

const deleteTask = function (button) {
  button.parentElement.remove();
  saveTasks();
};

const saveTasks = function () {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach((task) => {
    tasks.push({
      text: task.innerText.replace("X", "").trim(),
      status: task.classList.contains("completed"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasks = function () {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let taskList = document.getElementById("taskList");

  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span onclick="toggleTask(this)">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(this)">X</button>
      `;

    if (task.status) {
      li.classList.add("completed");
    }
    taskList.appendChild(li);
  });
};

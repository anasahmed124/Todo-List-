let tasks = [];
let taskIdCounter = 1;
let currentFilter = "all";
try {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    const parsed = JSON.parse(savedTasks);
    if (Array.isArray(parsed)) {
      tasks = parsed;
      taskIdCounter =
        tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    }
  }
} catch (error) {
  tasks = [];
}

function addTask() {
  const inputValue = document.getElementById("add-bar").value;
  const cleanValue = inputValue.trim();
  if (cleanValue === "") {
    return;
  }

  const newTask = {
    id: taskIdCounter,

    title: cleanValue,
    completed: false,
  };

  taskIdCounter++;
  tasks.push(newTask);
  document.getElementById("add-bar").value = "";
}

function render() {
  const list = document.getElementById("todo-list");
  let filterTask;
  list.innerHTML = "";

  if (currentFilter === "active") {
    filterTask = tasks.filter((t) => {
      return t.completed === false;
    });
  } else if (currentFilter === "completed") {
    filterTask = tasks.filter((t) => {
      return t.completed === true;
    });
  } else {
    filterTask = tasks;
  }

  filterTask.forEach((task) => {
    const li = document.createElement("li");
    li.classList.toggle("done", task.completed);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("aria-label", `Mark as complete: ${task.title}`);
    checkbox.checked = task.completed;
    li.appendChild(checkbox);

    const taskText = document.createElement("span");
    taskText.textContent = task.title;
    li.appendChild(taskText);
    list.appendChild(li);

    const btnBox = document.createElement("div");
    btnBox.classList.add("btn-box");
    li.appendChild(btnBox);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("aria-label", `Delete task: ${task.title}`);
    btnBox.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((deletedTask) => {
        return deletedTask.id !== task.id;
      });

      render();
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.setAttribute("aria-label", `Edit task: ${task.title}`);
    btnBox.appendChild(editBtn);
    editBtn.addEventListener("click", () => {
      const newTitle = prompt("Update your task", task.title);
      const cleanNewTitle = newTitle?.trim();
      if (cleanNewTitle) {
        task.title = cleanNewTitle;

        render();
      }
    });

    checkbox.addEventListener("click", () => {
      task.completed = !task.completed;

      render();
    });
  });
  filterButtons.forEach((btn) => {
    btn.classList.toggle("active-filter", btn.dataset.filter === currentFilter);
  });
  saveTasks();
  remainTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function remainTasks() {
  const remain = tasks.filter((t) => {
    return t.completed === false;
  });
  const remainCount = remain.length;
  const nameTask = remainCount === 1 ? "task" : "tasks";
  document.getElementById("counter").textContent =
    `${remainCount} ${nameTask} remaining`;
}

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    render();
  });
});

const textInput = document.getElementById("add-bar");
textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();

    render();
  }
});

const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", () => {
  addTask();
  render();
});

render();

const savedTodos = localStorage.getItem("todos");

let todos = savedTodos
  ? JSON.parse(savedTodos)
  : [
      {
        text: "Terminar el ejercicio de HTML",
        completed: false,
      },
      {
        text: "Revisar los apuntes de CSS",
        completed: true,
      },
      {
        text: "Practicar Flexbox",
        completed: false,
      },
      {
        text: "Preparar la clase de JavaScript",
        completed: false,
      },
      {
        text: "Organizar el portafolio",
        completed: true,
      },
    ];

const taskList = document.querySelector(".task-list");
const totalTasks = document.querySelector("#total-tasks");
const pendingTasks = document.querySelector("#pending-tasks");
const completedTasks = document.querySelector("#completed-tasks");
const deleteCompleteButton = document.querySelector("#delete-completed");
const deleteAllButton = document.querySelector("#delete-all");
const taskForm = document.querySelector(".task-form");
const newTaskInput = document.querySelector("#new-task");
const filterButtons = document.querySelectorAll(".task-filters__button");

let currentFilter = "all";


function renderTodos() {
    taskList.innerHTML = "";

    saveTodos();

    totalTasks.textContent = todos.length;

pendingTasks.textContent = todos.filter((todo) => {
  return todo.completed === false;
}).length;

completedTasks.textContent = todos.filter((todo) => {
  return todo.completed === true;
}).length;

  todos.forEach((todo, index) => {
    if (currentFilter === "pending" && todo.completed) {
  return;
}

    if (currentFilter === "completed" && !todo.completed) {
  return;
}
  const li = document.createElement("li");
  li.classList.add("task");

  if (todo.completed) {
    li.classList.add("task--completed");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  checkbox.addEventListener("change", () => {
    todos[index].completed = checkbox.checked;
    renderTodos();
  });

  const label = document.createElement("label");
  label.textContent = todo.text;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Eliminar";

  deleteButton.addEventListener("click", () => {
    todos.splice(index, 1);
    renderTodos();

  });

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(deleteButton);

  taskList.appendChild(li);
});

}

deleteCompleteButton.addEventListener("click", () => {
  todos = todos.filter((todo) => {
    return todo.completed === false;
  });

  renderTodos();
});

deleteAllButton.addEventListener("click", () => {
    todos = [];
    renderTodos();
})

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = newTaskInput.value.trim();

  if (taskText === "") {
    return;
  }

  todos.push({
    text: taskText,
    completed: false,
  });

  newTaskInput.value = "";

  renderTodos();
});

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      filterButton.classList.remove("task-filters__button--active");
    });

    button.classList.add("task-filters__button--active");

    renderTodos();
  });


});

renderTodos();


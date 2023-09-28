import {
  hideTodoElements,
  makeTodoElement,
  showTodoElements,
} from "./utils.js";

let initialTodos = [
  { id: 1, title: "Learn javascript", completed: true },
  { id: 2, title: "Buy a unicorn", completed: false },
];

const newTodoFormElement = document.querySelector(".header .new-todo-form");
const newTodoInputElement = document.querySelector(".header .new-todo");

const mainElement = document.querySelector(".main");
const footerElement = document.querySelector(".footer");

const ulElement = document.querySelector(".main .todo-list");

const clearAllCompletedTodosButton = document.querySelector(
  ".footer .clear-completed"
);

// Filters elements

const allTodosFilterElement = document.querySelector(".filters .filter.all");

const pendingTodosFilterElement = document.querySelector(
  ".filters .filter.pending"
);

const completedTodosFilterElement = document.querySelector(
  ".filters .filter.completed"
);

const createTodoElementsFromArray = (todos) => {
  const todoElements = todos.map((todo) => makeTodoElement(todo));

  return todoElements;
};

const todoElements = createTodoElementsFromArray(initialTodos);

// When document loads add todoElements to the ul

document.addEventListener("DOMContentLoaded", () => {
  const incompleteTodos = initialTodos.filter((todo) => !todo.completed);

  if (todoElements.length === 0) {
    mainElement.style.display = "none";
    footerElement.style.display = "none";
  } else {
    todoElements.forEach((todoElement) => {
      ulElement.appendChild(todoElement);
    });

    const footerTodoCount = document.createElement("span");

    footerTodoCount.innerHTML = `${incompleteTodos.length} <strong>${
      incompleteTodos.length == 1 ? "item" : "items"
    }</strong> left`;

    footerTodoCount.classList.add("todo-count");

    footerElement.prepend(footerTodoCount);

    // Adding all the event listeners to the todo elements

    todoElements.forEach((todoElement, index) => {
      const elementId = todoElement.getAttribute("id");

      const todoCheckboxElement = todoElement.querySelector(
        `li#${elementId} .toggle`
      );
      const destroyButtonElement = todoElement.querySelector(
        `li#${elementId} .destroy`
      );

      destroyButtonElement.addEventListener("click", () => {
        deleteTodoElement(elementId, index);
      });

      todoCheckboxElement.addEventListener("change", () => {
        toggleCompleted(elementId, index);
      });
    });

    // Add event listener to the new todo form

    newTodoFormElement.addEventListener("submit", (event) => {
      event.preventDefault();

      const newTodoTitle = newTodoInputElement.value;

      // prevent script injection
      const escapedNewTodoTitle = newTodoTitle.replace(/</g, "&lt;");

      // trim() removes whitespace from both ends of a string
      if (escapedNewTodoTitle.trim() === "") {
        return;
      }

      const newTodo = {
        id: initialTodos.length + 1,
        title: escapedNewTodoTitle,
        completed: false,
      };

      const newTodoElement = makeTodoElement(newTodo);

      // Add event listeners to the new todo element

      const newTodoCheckboxElement = newTodoElement.querySelector(
        `li#todo-${newTodo.id} .toggle`
      );

      const newTodoDestroyButtonElement = newTodoElement.querySelector(
        `li#todo-${newTodo.id} .destroy`
      );

      newTodoDestroyButtonElement.addEventListener("click", () => {
        deleteTodoElement(`todo-${newTodo.id}`);
      });

      newTodoCheckboxElement.addEventListener("change", () => {
        toggleCompleted(`todo-${newTodo.id}`);
      });

      clearAllCompletedTodosButton.addEventListener("click", () => {
        clearAllCompletedTodos();
      });

      ulElement.appendChild(newTodoElement);

      initialTodos.push(newTodo);

      newTodoInputElement.value = "";
    });

    // Add event listeners to the filters

    allTodosFilterElement.addEventListener("click", () => {
      setFilteredTodos("all");
    });

    pendingTodosFilterElement.addEventListener("click", () => {
      setFilteredTodos("pending");
    });

    completedTodosFilterElement.addEventListener("click", () => {
      setFilteredTodos("completed");
    });
  }
});

export function deleteTodoElement(todoId) {
  const todoElement = document.querySelector(`#${todoId}`);
  todoElement.remove();

  // create new todos array without the deleted todo and set it to initialTodos

  initialTodos = initialTodos.filter((todo) => {
    return todo.id !== parseInt(todoId.split("-")[1]);
  });

  updateIncompleteTodosCount();
}

const toggleCompleted = (todoId) => {
  const todoElement = document.querySelector(`#${todoId}`);
  const todoCheckboxElement = todoElement.querySelector(`li#${todoId} .toggle`);

  const todoInArray = initialTodos.find((todo) => {
    return todo.id === parseInt(todoId.split("-")[1]);
  });

  if (todoCheckboxElement.checked) {
    todoElement.classList.add("completed");

    // Add todo to completedTodos array
    todoInArray.completed = true;
  } else {
    todoElement.classList.remove("completed");

    // Remove todo from completedTodos array
    todoInArray.completed = false;
  }

  updateIncompleteTodosCount();
};

function updateIncompleteTodosCount() {
  const footerTodoCount = document.querySelector(".footer .todo-count");

  const incompleteTodos = initialTodos.filter((todo) => !todo.completed);

  footerTodoCount.innerHTML = `${incompleteTodos.length} <strong>${
    incompleteTodos.length == 1 ? "item" : "items"
  }</strong> left`;
}

function clearAllCompletedTodos() {
  const completedTodos = initialTodos.filter((todo) => todo.completed);

  completedTodos.forEach((todo) => {
    deleteTodoElement(`todo-${todo.id}`);
  });
}

function setFilteredTodos(filter) {
  const allFilters = document.querySelectorAll(".filters .filter a");

  allFilters.forEach((filter) => {
    filter.classList.remove("selected");
  });

  const pending = initialTodos.filter((todo) => !todo.completed);
  const completedTodos = initialTodos.filter((todo) => todo.completed);

  if (filter === "pending") {
    // add class "selected" to the clicked filter a element
    pendingTodosFilterElement.querySelector("a").classList.add("selected");

    hideTodoElements(completedTodos);

    showTodoElements(pending);
  } else if (filter === "completed") {
    // add class "selected" to the clicked filter a element
    completedTodosFilterElement.querySelector("a").classList.add("selected");

    hideTodoElements(pending);

    showTodoElements(completedTodos);
  } else if (filter == "all") {
    // add class "selected" to the clicked filter a element
    allTodosFilterElement.querySelector("a").classList.add("selected");

    // remoe display none from all todos
    const todoElements = ulElement.querySelectorAll("li");

    todoElements.forEach((todoElement) => {
      console.log(todoElement);
      todoElement.style.display = "block";
    });
  }
}

// eslint-disable-next-line no-unused-vars
function mutationCallback(mutationsList, observer) {
  mutationsList.forEach((mutation) => {
    if (mutation.type === "childList") {
      updateIncompleteTodosCount();
    }
  });
}

const observer = new MutationObserver(mutationCallback);

const config = { childList: true };

observer.observe(ulElement, config);

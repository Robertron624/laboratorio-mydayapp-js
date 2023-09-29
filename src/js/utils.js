export const makeTodoElement = (todo) => {
  const { id, title, completed } = todo;

  const todoLiElement = document.createElement("li");

  todoLiElement.setAttribute("id", `todo-${id}`);

  if (completed) {
    todoLiElement.classList.add("completed");
  }

  //1. INNER LI DIV
  const todoInnerDivElement = document.createElement("div");
  todoInnerDivElement.classList.add("view");

  // 1.1 Create todo info elements - completed/uncompleted checkbox, label, and destroy button
  const todoCheckboxElement = document.createElement("input");

  todoCheckboxElement.setAttribute("type", "checkbox");
  if (completed) {
    todoCheckboxElement.setAttribute("checked", "checked");
  }

  todoCheckboxElement.classList.add("toggle");

  // Add event listener to checkbox

  const labelElement = document.createElement("label");
  labelElement.textContent = title;

  const destroyButtonElement = document.createElement("button");
  destroyButtonElement.classList.add("destroy");

  // Add event listener to destroy button

  // 1.2 Add the elements to the inner div
  todoInnerDivElement.appendChild(todoCheckboxElement);
  todoInnerDivElement.appendChild(labelElement);
  todoInnerDivElement.appendChild(destroyButtonElement);

  // 2. LI EDIT INPUT
  const todoEditInputElement = document.createElement("input");
  todoEditInputElement.classList.add("edit");
  todoEditInputElement.value = title;

  // 3. Append inner div and edit input to li
  todoLiElement.appendChild(todoInnerDivElement);
  todoLiElement.appendChild(todoEditInputElement);

  return todoLiElement;
};

export function hideTodoElements(todoItems) {
  todoItems.forEach((todo) => {
    const todoElement = document.querySelector(`#todo-${todo.id}`);
    todoElement.style.display = "none";
  });
}

export function showTodoElements(todoItems) {
  todoItems.forEach((todo) => {
    const todoElement = document.querySelector(`#todo-${todo.id}`);
    todoElement.style.display = "block";
  });
}

export function saveToLocalStorage(todoItems) {
  localStorage.setItem("todos", JSON.stringify(todoItems));
}

export function getTodosFromLocalStorage() {
  const todos = JSON.parse(localStorage.getItem("todos"));

  return todos;
}

export const createTodoElementsFromArray = (todos) => {
  const todoElements = todos.map((todo) => makeTodoElement(todo));

  return todoElements;
};

export function editTodoElement(id, newTitle, todoItems) {
  const todoElement = document.querySelector(`#todo-${id}`);
  const todoLabelElement = todoElement.querySelector("label");

  // Update the todo in the todoItems array
  const todoToUpdate = todoItems.find((todo) => todo.id === id);
  todoToUpdate.title = newTitle;

  // update the html element
  todoLabelElement.textContent = newTitle;
}

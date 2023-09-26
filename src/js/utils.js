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

import { addTodoToList, removeTodoFromList, editTodo } from "./index.js";

const validateEdit = (taskName, priority) => {
  const priorityPattern = /^[1-9]*$/;
  const taskNamePattern = /[a-zA-Z0-9]/;
  if (
    (taskName.trim() &&
      taskName.length > 0 &&
      taskNamePattern.test(taskName)) ||
    (priority.trim() && priority.length > 0 && priorityPattern.test(priority))
  ) {
    return true;
  }
  return false;
};
const validate = (taskName, priority) => {
  const priorityPattern = /^[1-9]*$/;
  const taskNamePattern = /[a-zA-Z0-9]/;
  if (
    taskName.trim() &&
    priorityPattern.test(priority) &&
    taskNamePattern.test(taskName) &&
    taskName.length > 0 &&
    priority.length > 0
  ) {
    return true;
  }
  return false;
};
const createTodoItem = (taskName, priority, list, ID) => {
  const row = document.createElement("tr");
  const idCell = document.createElement("td");
  const taskNameCell = document.createElement("td");
  const priorityCell = document.createElement("td");
  const buttonCell = document.createElement("td");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  row.setAttribute("id", ID);
  idCell.innerHTML = ID;
  taskNameCell.innerHTML = taskName;
  priorityCell.innerHTML = priority;
  editButton.innerHTML = "Edit";
  editButton.classList.add("btn", "btn-primary");
  editButton.setAttribute("data-bs-target", "#exampleModal");
  editButton.setAttribute("data-bs-toggle", "modal");
  editButton.addEventListener("click", () => {
    localStorage.setItem("taskID", row.getAttribute("id"));
  });
  deleteButton.innerHTML = "Delete";
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.addEventListener("click", () => {
    row.remove();
    list = removeTodoFromList(ID, list);
    ID--;
  });
  buttonCell.appendChild(editButton);
  buttonCell.appendChild(deleteButton);
  row.appendChild(idCell);
  row.appendChild(taskNameCell);
  row.appendChild(priorityCell);
  row.appendChild(buttonCell);
  return row;
};
const handelAddButton = (list, ID) => {
  const tasksList = document.getElementById("tasksList");
  const input = document.getElementById("taskName");
  const priority = document.getElementById("priority");
  const inputValue = input.value;
  const priorityValue = priority.value;
  if (validate(inputValue, priorityValue)) {
    const intPriority = parseInt(priorityValue);
    list = addTodoToList([ID, inputValue, intPriority], list);
    const row = createTodoItem(inputValue, intPriority, list, ID);
    tasksList.appendChild(row);
    input.value = "";
    priority.value = "";
  } else {
    alert("Invalid input");
  }
};



const handleSendButton = (list) => {
  const rowToEdit = document.getElementById(localStorage.getItem("taskID"));
  const taskNameCell = rowToEdit.cells[1];
  const priorityCell = rowToEdit.cells[2];
  const newTaskName = document.getElementById("task-name");
  const newPriority = document.getElementById("priority-text");
  const newTaskNameValue = newTaskName.value;
  const newPriorityValue = newPriority.value;
  if (validateEdit(newTaskNameValue, newPriorityValue)) {
    const intNewPriority = parseInt(newPriorityValue);
    list = editTodo(ID, newTaskNameValue, intNewPriority, list);
    if(newTaskNameValue) taskNameCell.innerHTML = newTaskNameValue;
    if(intNewPriority) priorityCell.innerHTML = intNewPriority;
    newTaskName.value = "";
    newPriority.value = "";
  } else {
    alert("Invalid input");
  }
};

const sortTableByTaskName = (list) => {
  const listSortedTaskName = list.sort((a, b) => {
    return a.taskName.localeCompare(b.taskName);
  });
  const tableBody = document.getElementById("tasksList");
  tableBody.innerHTML = "";
  for (const todo of listSortedTaskName) {
    const row = createTodoItem(todo.taskName, todo.priority, listSortedTaskName, todo.id);
    tableBody.appendChild(row);
  }
};

const sortTableByPriority = (list) => {
  const listSortedPriority = list.sort((a, b) => {
    return a.priority - b.priority;
  });
  const tableBody = document.getElementById("tasksList");
  tableBody.innerHTML = "";
  for (const todo of listSortedPriority) {
    const row = createTodoItem(todo.taskName, todo.priority, listSortedPriority, todo.id);
    tableBody.appendChild(row);
  }
};

const listOfTodos = new Array();
const addButton = document.getElementById("add");
const sendButton = document.getElementById("sendButton");
const taskNameCol = document.getElementById("taskNameCol");
const priorityCol = document.getElementById("priorityCol");
let ID = 0;
addButton.addEventListener("click", function () {
  handelAddButton(listOfTodos, ++ID);
});


sendButton.addEventListener("click", function () {
  handleSendButton(listOfTodos);
});
taskNameCol.addEventListener("click", function () {
  sortTableByTaskName(listOfTodos);
});
priorityCol.addEventListener("click", function () {
  sortTableByPriority(listOfTodos);
});
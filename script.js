import { addTodoToList, removeTodoFromList, editTodo } from "./index.js";

const addButton = document.getElementById("add");
const table = document.getElementById("tasksTable");
let buttons;
let ID = 1;
let tasks = [];
const priorityPattern = /^[0-9]*$/;
const taskNamePattern = /[a-zA-Z0-9]/;
// update row in table
function updateRow(table, id, taskName, priority) {
  const rowToUpdate = table.rows[id];
  rowToUpdate.cells[1].innerHTML = taskName;
  rowToUpdate.cells[2].innerHTML = priority;
}

// Remove a todo from the table.
function deleteTaskRow(element) {
  const cell = element.parentNode;
  const row = cell.parentNode;
  row.parentNode.removeChild(row);
}
// Add a new todo to the table.

function addtaskRow(table, tasks) {
  let old_body = table.getElementsByTagName("tbody")[0];
  let new_body = document.createElement("tbody");
  old_body.parentNode.replaceChild(new_body, old_body);
  for (let todo of tasks) {
    let row = new_body.insertRow();
    row.setAttribute("id", todo.id);
    row.insertCell().innerHTML = todo.id;
    row.insertCell().innerHTML = todo.taskName;
    row.insertCell().innerHTML = todo.priority;
    row.insertCell(
      3
    ).innerHTML = `<button class="btn btn-primary" id="edit${todo.id}" data-bs-target="#exampleModal" data-bs-toggle="modal">Edit</button> <button class="btn btn-danger" id="delete${todo.id}">Delete</button>`;
  }
}
// Input validation function
function validateInput(taskName, priority, add) {
  switch (add) {
    case true:
      if (
        taskName.trim() &&
        priorityPattern.test(priority) &&
        taskNamePattern.test(taskName) &&
        taskName.length > 0 &&
        priority.length > 0 &&
        parseInt(priority) > 0
      ) {
        return true;
      }
      break;
    case false:
      if (
        taskName.trim() &&
        priorityPattern.test(priority) &&
        taskNamePattern.test(taskName) &&
        (taskName.length > 0 || (priority.length > 0 && parseInt(priority) > 0))
      ) {
        return true;
      }
      break;
    default:
      break;
  }
  return false;
}

// This function add event listner on click for each edit/delete button add to the table
function createEventListner(element) {
  if (element.id.startsWith("delete")) {
    element.addEventListener("click", () => {
      let id = element.id.slice(6);
      id = parseInt(id);
      tasks = removeTodoFromList(id, tasks);
      deleteTaskRow(element);
      ID--;
    });
  } else if (element.id.startsWith("edit")) {
    element.addEventListener("click", () => {
      let id = element.id.slice(4);
      id = parseInt(id);
      const sendModalButton = document.getElementById("sendButton");
      sendModalButton.addEventListener("click", () => {
        const newTaskName = document.getElementById("task-name");
        const newPriority = document.getElementById("priority-text");
        const newTaskNameValue = newTaskName.value;
        const newPriorityValue = newPriority.value;
        if (validateInput(newTaskNameValue, newPriorityValue, false)) {
          const intNewPriority = parseInt(newPriorityValue);
          tasks = editTodo(id, newTaskNameValue, intNewPriority, tasks);
          newTaskName.value = "";
          newPriority.value = "";
          updateRow(table, id, newTaskNameValue, intNewPriority);
        } else {
          alert("Invalid priority/task name");
        }
      });
    });
  }
}

addButton.addEventListener("click", () => {
  const input = document.getElementById("taskName");
  const priority = document.getElementById("priority");
  let inputTaskName = input.value;
  let inputPriority = priority.value;
  if (validateInput(inputTaskName, inputPriority, true)) {
    const intPriority = parseInt(inputPriority);
    tasks = addTodoToList([ID, inputTaskName, intPriority], tasks);
    addtaskRow(table, tasks);
    ID++;
    input.value = "";
    priority.value = "";
    buttons = table.getElementsByTagName("button");
    buttons = Array.from(buttons);
    buttons.forEach(createEventListner);
  } else {
    alert("Invalid priority/task name");
  }
});

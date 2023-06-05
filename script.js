import {Task} from "./index.js";

const validate = (taskName, priority, addFlag) => {
  const priorityPattern = /^[1-9]*$/;
  const taskNamePattern = /[a-zA-Z0-9]/;
  let validationState;  
  switch (addFlag) {
      case true:
        if (
          taskName.trim() &&
          priorityPattern.test(priority) &&
          taskNamePattern.test(taskName) &&
          taskName.length > 0 &&
          priority.length > 0
        ) {
          validationState = true;
        }
        else validationState = false;
        break;
      default:
        if (
          (taskName.trim() &&
            taskName.length > 0 &&
            taskNamePattern.test(taskName)) ||
          (priority.trim() && priority.length > 0 && priorityPattern.test(priority))
        ) {
          validationState =  true;
        }
        else validationState = false;
        break;
    }
    return validationState;
}
const createTodoItem = (taskName, priority, list, id) => {
  const row = document.createElement("tr");
  const idCell = document.createElement("td");
  const taskNameCell = document.createElement("td");
  const priorityCell = document.createElement("td");
  const buttonCell = document.createElement("td");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const doneCheckbox = document.createElement("input");
  row.setAttribute("id", id);
  idCell.innerHTML = id;
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
    list = list.filter((todo) => todo.ID !== id);
    --ID;
  });
  doneCheckbox.setAttribute("type", "checkbox");
  doneCheckbox.setAttribute("id", id);
  doneCheckbox.classList.add("form-check-input");
  doneCheckbox.style.marginTop = "3%";
  doneCheckbox.addEventListener("change", () => {
    const found = list.find((todo) => todo.ID === id);
    if(found.status === 'done') {
      found.status = 'not done';
      editButton.removeAttribute('disabled');
      taskNameCell.style.textDecoration = "none";
    }
    else{
      found.status = 'done';
      editButton.setAttribute('disabled', 'disabled');
      taskNameCell.style.textDecoration = "line-through";
    }
  });
  buttonCell.appendChild(editButton);
  buttonCell.appendChild(deleteButton);
  buttonCell.appendChild(doneCheckbox);
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
  if (validate(inputValue, priorityValue, true)) {
    const intPriority = parseInt(priorityValue);
    const task = new Task(inputValue, intPriority, ID);
    list.push(task);
    const row = createTodoItem(task.taskName, task.priority, list, task.ID);
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
  if (validate(newTaskNameValue, newPriorityValue, false)) {
    const intNewPriority = parseInt(newPriorityValue);
    const foundElement = list.find(element => element.ID === parseInt(localStorage.getItem("taskID")));
    foundElement.taskName = newTaskNameValue ?? foundElement.taskName;
    foundElement.priority = intNewPriority ?? foundElement.priority;
    taskNameCell.innerHTML = foundElement.taskName;
    priorityCell.innerHTML = foundElement.priority;
    newTaskName.value = "";
    newPriority.value = "";
  } else {
    alert("Invalid input");
  }
};

const handleDeleteAllButton = (list) => {
  const inputElements = document.getElementsByTagName("input");
  const tableBody = document.getElementById("tasksList");
  for(let i = 0; i < inputElements.length; i++) {
    if(inputElements[i].type === "checkbox") {
      if(inputElements[i].checked) {
        tableBody.removeChild(inputElements[i].parentElement.parentElement);
        list = list.filter((todo) => todo.ID !== parseInt(inputElements[i].id));
        ID--;
      }
    }
  }
}


const sortColumn = (list, column) => {
  let listSorted=[]; 
  switch (column) {
    case 'name':
      listSorted = list.sort((a, b) => {return a.taskName.localeCompare(b.taskName);});
      break;
    default:
      listSorted = list.sort((a, b) => {return a.priority - b.priority;});
      break;
  }
  const tableBody = document.getElementById("tasksList");
  tableBody.innerHTML = "";
  for (const todo of listSorted) {
    const row = createTodoItem(todo.taskName, todo.priority, listSorted, todo.ID);
    tableBody.appendChild(row);
  }
}



const listOfTodos = new Array();
const addButton = document.getElementById("add");
const sendButton = document.getElementById("sendButton");
const taskNameCol = document.getElementById("taskNameCol");
const priorityCol = document.getElementById("priorityCol");
const deleteAll = document.getElementById("clear");
let ID = 0;
addButton.addEventListener("click", function () {
  handelAddButton(listOfTodos, ++ID);
});
sendButton.addEventListener("click", function () {
  handleSendButton(listOfTodos);
});
taskNameCol.addEventListener("click", function () {
  sortColumn(listOfTodos, 'name');
});
priorityCol.addEventListener("click", function () {
  sortColumn(listOfTodos, 'priority');
});
deleteAll.addEventListener("click", function () {
  handleDeleteAllButton(listOfTodos);
});
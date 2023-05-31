"use strict";
function createTodo([...props]) {
  let [id, taskName, priority] = props;
  let todo = {
    id: id,
    taskName: taskName,
    priority: priority,
  };
  return todo;
}

// Create a recursive binary search function that takes a sorted array and a value and returns the index of the value in the array.
// Note: the array consists of objects and search will be over the priority property of the objects.
function binarySearch(array, min, max, value) {
  if (max >= min) {
    let mid = Math.floor((min + max) / 2);
    if (array[mid].priority <= value) {
      return binarySearch(array, mid+1, max, value);
    } else if (array[mid].priority > value) {
      return binarySearch(array, min, mid-1, value);
    }
  }
  return max;
}
// Add a new todo to the list.
export function addTodoToList([...props], list) {
  let todo = createTodo([...props]);
  if(list.length === 0){
    list.push(todo);
    return list;
  }
  let index = binarySearch(list, 0, list.length - 1, todo.priority);
  list.splice(index+1, 0, todo);
  return list;
}

// Remove a todo from the list.
export function removeTodoFromList(id, list) {
    for(let todo of list){
        if(todo.id === id){
            list.splice(list.indexOf(todo), 1);
            return list;
        }
    }
} 

// Edit a todo.
export function editTodo(id, taskName, priority, list) {
    for(let todo of list){
        if(todo.id === id){
            todo.taskName = taskName ? taskName : todo.taskName;
            todo.priority = priority ? priority : todo.priority;
            if(priority) list.sort((a, b) => a.priority - b.priority);
            return list;
        }
    }
}

// A function test the functionality of the above functions
// function test() {
//     let list = [];
//     list = addTodoToList([1, "task1", 1], list);
//     console.log(list);
//     list = addTodoToList([2, "task2", 2], list);
//     list = addTodoToList([3, "task3", 3], list);
//     console.log(list);
//     list = editTodo(1, "task4", 4, list);
//     console.log(list);
//     list = removeTodoFromList(1, list);
//     console.log(list);
// }
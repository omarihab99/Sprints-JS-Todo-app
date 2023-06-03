const { typeOf } = require("mathjs");

let tasksArray = [
  ["Nathalie Nader Nabil", "Task 01", "Option 2"],
  ["Youssef Mohamed Ahmed Mohamed Youssef", "Task 01", "Option 1"],
  ["Salma Nasreldin", "Task 01", "Option 1"],
  ["Engy Mostafa", "Task 01", "Option 1"],
  ["Engy Mostafa", "Task 01", "Option 1"],
  ["Engy ahmed mostafa ", "Task 01", "Option 1"],
  ["Abdelhay Nader Abdelhay Abozayed", "Task 01", "Option 1"],
  ["Abdelrahman Shemies", "Task 01", "Option 1"],
  ["Alaa Ahmed", "Task 01", "Option 2"],
  ["Youssef Fathy Mahmoud", "Task 01", "Option 1"],
  ["Mark Bassem", "Task 01", "Option 1"],
  ["Anas Ahmed", "Task 01", "Option 1"],
  ["Adham Hesham", "Task 01", "Option 1"],
  ["Mohamed Ahmed Fahmi", "Task 01", "Option 1"],
  ["rola wafi", "Task 01", "Option 1"],
  ["Moataz Youssef", "Task 01", "Option 2"],
  ["Ahmad Salama", "Task 01", "Option 1"],
  ["Mohamed Ahmed Fahmi", "Task 01", "Option 1"],
  ["Ahmad Salama Abdelaziz", "Task 01", "Option 2"],
  ["Kareem Ramzi El-Tahlawi", "Task 01", "Option 1"],
  ["Alaa Ahmed", "Task 01", "Option 2"],
  ["rola wafi", "Task 01", "Option 2"],
  ["Mohamed Fahmi", "Task 01", "Option 1"],
  ["Mohamed Fahmi", "Task 01", "Option 2"],
  ["Alaa Ahmed", "Task 01", "Option 2"],
  ["Abdelrahman Shemies", "Task 01", "Option 1"],
  ["Nathalie Nader", "Task 01", "Option 1"],
  ["Mariam Ahmed", "Task 01", "Option 1"],
];
const extractNames = (tasksArray) => {
  if (!Array.isArray(tasksArray)) {
    console.log("not an array");
    return;
  }
  let set = new Set();
  for (let i = 0; i < tasksArray.length; i++) {
    if (!typeof tasksArray[i][0] === "string") {
      console.log("not a string");
      return;
    }
    set.add(tasksArray[i][0]);
  }
  for (let name of set) {
    console.log(name);
  }
};
extractNames(tasksArray);

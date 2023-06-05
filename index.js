"use strict";

export class Task {
  #taskName;
  #priority;
  #ID;
  #status = "pending";
  constructor(taskName, priority, ID) {
    this.#taskName = taskName;
    this.#priority = priority;
    this.#ID = ID;
  }
  get status() {
    return this.#status;
  }
  set status(status) {
    this.#status = status;
  }
  get taskName() {
    return this.#taskName;
  }
  set taskName(taskName) {
    this.#taskName = taskName;
  }
  get priority() {
    return this.#priority;
  }
  set priority(priority) {
    this.#priority = priority;
  }
  get ID() {
    return this.#ID;
  }
  set ID(ID) {
    this.#ID = ID;
  } 
}
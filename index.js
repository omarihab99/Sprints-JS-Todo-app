"use strict";

export class Task {
  _taskName;
  _priority;
  _ID;
  _status = "pending";
  constructor(taskName, priority, ID) {
    this.taskName = taskName;
    this.priority = priority;
    this._ID = ID;
  }
  get status() {
    return this._status;
  }
  set status(status) {
    this._status = status;
  }
  get taskName() {
    return this._taskName;
  }
  set taskName(taskName) {
    this._taskName = taskName;
  }
  get priority() {
    return this._priority;
  }
  set priority(priority) {
    this._priority = priority;
  }
  get ID() {
    return this._ID;
  }
  set ID(ID) {
    this._ID = ID;
  }
  
}
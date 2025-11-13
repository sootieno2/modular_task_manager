import { Task } from "./task.js";

export class TimedTask extends Task {
  constructor(title, dueDate, done = false, id = null) {
    super(title, done, id);
    this.dueDate = dueDate ? new Date(dueDate) : null;
  }

  get isOverdue() {
    if (!this.dueDate) return false;
    return !this.done && new Date() > this.dueDate;
  }

  toJSON() {
    // preserve dueDate for storage
    return {
      id: this.id,
      title: this.title,
      done: this.done,
      dueDate: this.dueDate ? this.dueDate.toISOString() : null,
    };
  }

  static from(obj) {
    return new TimedTask(obj.title, obj.dueDate, obj.done, obj.id);
  }
}

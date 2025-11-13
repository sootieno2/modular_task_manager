import { TimedTask } from "./TimedTask.js";

const KEY = "tasks";

export const store = {
  load() {
    try {
      const data = JSON.parse(localStorage.getItem(KEY)) || [];
      return data.map(obj => obj.dueDate ? TimedTask.from(obj) : obj);
    } catch {
      return [];
    }
  },
  save(tasks) {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  },
};

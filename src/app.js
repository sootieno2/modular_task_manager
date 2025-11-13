import { Task } from "./task.js";
import { TimedTask } from "./TimedTask.js";
import { store } from "./store.js";
import { render } from "./view.js";

let tasks = store.load();
let filter = "all";
let search = "";

const form = document.getElementById("task-form");
const input = document.getElementById("new-task");
const dateInput = document.getElementById("due-date");
const filters = document.getElementById("filters");
const searchInput = document.getElementById("search");

function update() {
  store.save(tasks);
  render(tasks, filter, search);
}

// Add task or timed task
form.addEventListener("submit", e => {
  e.preventDefault();
  const title = input.value.trim();
  const dueDate = dateInput.value;
  if (!title) return;

  const task = dueDate ? new TimedTask(title, dueDate) : new Task(title);
  tasks.push(task);

  input.value = "";
  dateInput.value = "";
  update();
});

// Toggle / Delete
document.getElementById("task-list").addEventListener("click", e => {
  const id = e.target.closest("li")?.dataset.id;
  if (!id) return;

  if (e.target.classList.contains("toggle")) {
    const task = tasks.find(t => t.id === id);
    task.toggle();
  }

  if (e.target.classList.contains("delete")) {
    tasks = tasks.filter(t => t.id !== id);
  }

  update();
});

// Filters
filters.addEventListener("click", e => {
  if (e.target.tagName !== "BUTTON") return;
  document.querySelectorAll("#filters button").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  filter = e.target.dataset.filter;
  update();
});

// Search
searchInput.addEventListener("input", e => {
  search = e.target.value;
  update();
});

// Initial render
update();

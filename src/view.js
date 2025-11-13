 import { escapeHTML } from "./utils.js";

export function render(tasks, filter, search) {
  const list = document.getElementById("task-list");
  const count = document.getElementById("count");

  list.innerHTML = "";

  const filtered = tasks.filter(t => {
    if (filter === "active") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  }).filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.dataset.id = task.id;
    li.className = `${task.done ? "done" : ""} ${task.isOverdue ? "overdue" : ""}`.trim();

    const due = task.dueDate
      ? `<small class="due">Due: ${new Date(task.dueDate).toLocaleDateString()}</small>`
      : "";

    li.innerHTML = `
      <div>
        <span class="title">${escapeHTML(task.title)}</span>
        ${due}
      </div>
      <div>
        <button class="toggle">✓</button>
        <button class="delete">🗑</button>
      </div>
    `;
    list.appendChild(li);
  });

  count.textContent = `${filtered.length} task(s) shown`;
}

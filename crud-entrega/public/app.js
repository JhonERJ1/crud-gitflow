const API = "/api/tasks";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const errorBox = document.getElementById("error");
const emptyBox = document.getElementById("empty");

// Muestra un mensaje de error temporal.
function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
  setTimeout(() => (errorBox.hidden = true), 3000);
}

// READ: pide las tareas al servidor y las dibuja en pantalla.
async function loadTasks() {
  const res = await fetch(API);
  const tasks = await res.json();

  list.innerHTML = "";
  emptyBox.hidden = tasks.length > 0;

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.done ? " done" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => toggleDone(task));

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.textContent = "Editar";
    editBtn.addEventListener("click", () => editTask(task));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    actions.append(editBtn, deleteBtn);
    li.append(checkbox, title, actions);
    list.append(li);
  });
}

// CREATE: envia una tarea nueva al servidor.
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return showError("Escribe algo primero.");

  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    const data = await res.json();
    return showError(data.error || "No se pudo crear la tarea.");
  }

  input.value = "";
  loadTasks();
});

// UPDATE: marca/desmarca una tarea como completada.
async function toggleDone(task) {
  await fetch(`${API}/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done: !task.done }),
  });
  loadTasks();
}

// UPDATE: edita el titulo de una tarea.
async function editTask(task) {
  const nuevo = prompt("Editar tarea:", task.title);
  if (nuevo === null) return; // el usuario cancelo
  if (nuevo.trim() === "") return showError("El titulo no puede quedar vacio.");

  await fetch(`${API}/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: nuevo.trim() }),
  });
  loadTasks();
}

// DELETE: elimina una tarea.
async function deleteTask(id) {
  if (!confirm("Eliminar esta tarea?")) return;
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadTasks();
}

// Carga inicial
loadTasks();

const fs = require("fs");
const path = require("path");

// Archivo donde se guardan las tareas de forma persistente.
const DATA_FILE = path.join(__dirname, "..", "data", "tasks.json");

// Lee el arreglo completo de tareas desde el archivo JSON.
function readTasks() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

// Guarda el arreglo completo de tareas en el archivo JSON.
function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), "utf-8");
}

// Devuelve todas las tareas.
function getAll() {
  return readTasks();
}

// Busca una tarea por su id.
function getById(id) {
  return readTasks().find((task) => task.id === id);
}

// Crea una tarea nueva y la agrega al archivo.
function create({ title }) {
  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    title,
    done: false,
    priority: "normal",
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  writeTasks(tasks);
  return newTask;
}

// Actualiza el titulo y/o el estado de una tarea existente.
function update(id, changes) {
  const tasks = readTasks();
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return null;

  tasks[index] = { ...tasks[index], ...changes };
  writeTasks(tasks);
  return tasks[index];
}

// Elimina una tarea por su id. Devuelve true si la borro.
function remove(id) {
  const tasks = readTasks();
  const filtered = tasks.filter((task) => task.id !== id);
  if (filtered.length === tasks.length) return false;

  writeTasks(filtered);
  return true;
}

module.exports = { getAll, getById, create, update, remove };

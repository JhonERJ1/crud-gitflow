const express = require("express");
const store = require("../store");

const router = express.Router();

// READ - listar todas las tareas
router.get("/", (req, res) => {
  res.json(store.getAll());
});

// READ - obtener una tarea por id
router.get("/:id", (req, res) => {
  const task = store.getById(Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  res.json(task);
});

// CREATE - crear una tarea nueva
router.post("/", (req, res) => {
  const { title } = req.body;

  // Validacion: el titulo es obligatorio y no puede estar vacio.
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "El titulo es obligatorio" });
  }

  const task = store.create({ title: title.trim() });
  res.status(201).json(task);
});

// UPDATE - actualizar titulo o estado de una tarea
router.put("/:id", (req, res) => {
  const { title, done } = req.body;
  const changes = {};

  if (title !== undefined) {
    if (title.trim() === "") {
      return res.status(400).json({ error: "El titulo no puede estar vacio" });
    }
    changes.title = title.trim();
  }
  if (done !== undefined) {
    changes.done = Boolean(done);
  }

  const updated = store.update(Number(req.params.id), changes);
  if (!updated) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  res.json(updated);
});

// DELETE - eliminar una tarea
router.delete("/:id", (req, res) => {
  const deleted = store.remove(Number(req.params.id));
  if (!deleted) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  res.status(204).send();
});

module.exports = router;

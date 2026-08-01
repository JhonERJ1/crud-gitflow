const express = require("express");
const path = require("path");
const tasksRouter = require("./src/routes/tasks");
const healthRouter = require("./src/routes/health");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // permite leer JSON del cuerpo de las peticiones
app.use(express.static(path.join(__dirname, "public"))); // sirve el frontend

// Rutas de la API
app.use("/api/tasks", tasksRouter);
app.use("/api/health", healthRouter);

// Arranque del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

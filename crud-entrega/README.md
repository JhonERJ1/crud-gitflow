# Lista de Tareas - CRUD con Node.js + Express

Proyecto de la **Tarea 3 (Programacion III)**. Aplicacion CRUD de una lista de
tareas (to-do) construida con Node.js y Express, con una interfaz web sencilla.

## Funcionalidades (CRUD)

- **Crear** una tarea nueva.
- **Leer** / listar todas las tareas.
- **Actualizar** el titulo o marcar una tarea como completada.
- **Eliminar** una tarea.

## Tecnologias

- Node.js
- Express
- HTML, CSS y JavaScript (frontend)
- Almacenamiento en archivo JSON

## Como ejecutar el proyecto

1. Instalar las dependencias:

   ```bash
   npm install
   ```

2. Iniciar el servidor:

   ```bash
   npm start
   ```

3. Abrir el navegador en:

   ```
   http://localhost:3000
   ```

## Endpoints de la API

| Metodo | Ruta             | Descripcion                       |
| ------ | ---------------- | --------------------------------- |
| GET    | /api/tasks       | Lista todas las tareas            |
| GET    | /api/tasks/:id   | Obtiene una tarea por su id       |
| POST   | /api/tasks       | Crea una tarea nueva              |
| PUT    | /api/tasks/:id   | Actualiza una tarea existente     |
| DELETE | /api/tasks/:id   | Elimina una tarea                 |

## Estructura del proyecto

```
crud/
├── server.js            # Punto de entrada del servidor
├── package.json
├── data/
│   └── tasks.json       # Almacenamiento de las tareas
├── src/
│   ├── store.js         # Acceso a datos (leer/escribir JSON)
│   └── routes/
│       └── tasks.js     # Rutas REST del CRUD
└── public/
    ├── index.html       # Interfaz
    ├── style.css
    └── app.js           # Consumo de la API con fetch
```

## Metodologia de trabajo

El proyecto se desarrollo aplicando **Git Flow**, con ramas `feature/` para cada
funcionalidad y su integracion mediante Pull Requests hacia `dev`, `qa` y `main`.

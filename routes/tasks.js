const { Router } = require("express");
const TaskController = require("../controllers/task.js");
const router = new Router();

// Collection GET => list
// Http Code : 200
router.get("/tasks", TaskController.cget);

// Collection POST => create
// Http Code : 201
router.post("/tasks", TaskController.post);

// Collection GET => read
// Http Code : 200, 404
router.get("/tasks/:id", TaskController.get);

// Collection PUT => update or create
// Http Code : 200, 404
router.put("/tasks/:id", TaskController.put);

// Collection PATCH => update
// Http Code : 200, 404
router.patch("/tasks/:id", TaskController.patch); // fait une modification partielle contrairement a put qui remplace toute la ressource et crée une valeur si elle n'existe pas

// Collection DELETE => delete
// Http Code : 204, 404
router.delete("/tasks/:id", TaskController.delete);

module.exports = router;

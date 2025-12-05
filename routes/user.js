const { Router } = require("express");
const userController = require("../controllers/user.js");
const router = new Router();

// Collection GET => list
// Http Code : 200
router.get("/users", userController.cget);

// Collection POST => create
// Http Code : 201
router.post("/users", userController.post);

// Collection GET => read
// Http Code : 200, 404
router.get("/users/:id", userController.get);

// Collection PUT => update or create
// Http Code : 200, 404
router.put("/users/:id", userController.put);

// Collection PATCH => update
// Http Code : 200, 404
router.patch("/users/:id", userController.patch); // fait une modification partielle contrairement a put qui remplace toute la ressource et crée une valeur si elle n'existe pas

// Collection DELETE => delete
// Http Code : 204, 404
router.delete("/users/:id", userController.delete);

// Route actions ends with a verb
// Http Code: 200

// Collection action
// router.post(
//   "/users/notify-expired-account",
//   UserController.notifyExpiredAccount
// );

// Item action
router.post("/users/:id/activate", userController.activate);
module.exports = router;

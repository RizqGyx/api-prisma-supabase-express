const router = require("express").Router();

const ToDoController = require("../controllers/toDoController");

router.get("/", ToDoController.getTodos);
router.get("/:id", ToDoController.getTodoById);
router.post("/create", ToDoController.create);
router.put("/update/:id", ToDoController.updateToDo);
router.delete("/delete/:id", ToDoController.deleteToDo);

module.exports = router;

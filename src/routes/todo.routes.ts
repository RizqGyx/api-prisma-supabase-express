import { Router } from "express";
import ToDoController from "../controllers/todo.controller.js";

const router = Router();

router.get("/", ToDoController.getTodos);
router.get("/:id", ToDoController.getTodoById);
router.post("/create", ToDoController.createTodo);
router.put("/update/:id", ToDoController.updateTodo);
router.delete("/delete/:id", ToDoController.deleteTodo);

export default router;

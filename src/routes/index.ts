import { Router } from "express";
import TodoRouter from "./todo.routes.js";

const router = Router();

router.use("/api/v1/todo", TodoRouter);

export default router;

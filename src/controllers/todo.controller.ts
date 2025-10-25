import type { Request, Response, NextFunction } from "express";
import { todoService } from "../services/todo.service.js";

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await todoService.getAllTodos(req.user!.id);
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await todoService.createTodo(req.user!.id, req.body);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await todoService.updateTodo(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await todoService.deleteTodo(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default { getTodos, createTodo, updateTodo, deleteTodo };

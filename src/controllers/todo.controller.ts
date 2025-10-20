const { Request, Response } = require("express");
const TodoService = require("../services/todo.service");

export const getTodos = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const todos = await TodoService.getAllTodos(userId);
  res.json(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const todo = await TodoService.createTodo(userId, req.body);
  res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await TodoService.updateTodo(id, req.body);
  res.json(updated);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  await TodoService.deleteTodo(id);
  res.status(204).send();
};

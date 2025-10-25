import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/apperror.util.js";
import {
  findAll,
  findOne,
  createData,
  updateData,
  deleteData,
} from "./index.js";

export const getAllTodos = async (userId: string) => {
  try {
    return await findAll(prisma.todoItem, { ownerId: userId });
  } catch (error) {
    console.error("getAllTodos error:", error);
    throw new AppError("Failed to fetch todos", 500);
  }
};

export const getTodoById = async (id: string) => {
  try {
    const todo = await findOne(prisma.todoItem, { id });
    if (!todo) throw new AppError("Todo not found", 404);
    return todo;
  } catch (error) {
    console.error("getTodoById error:", error);
    throw new AppError("Failed to fetch todo", 500);
  }
};

export const createTodo = async (
  userId: string,
  data: { title: string; description?: string }
) => {
  try {
    return await createData(prisma.todoItem, {
      ...data,
      owner: { connect: { id: userId } },
      ownerId: userId,
    });
  } catch (error) {
    console.error("createTodo error:", error);
    throw new AppError("Failed to create todo", 400);
  }
};

export const updateTodo = async (
  id: string,
  data: Partial<{
    title: string;
    description?: string;
    isCompleted?: boolean;
    progress?: number;
  }>
) => {
  try {
    const todo = await updateData(prisma.todoItem, { id }, data);
    if (!todo) throw new AppError("Todo not found", 404);
    return todo;
  } catch (error) {
    console.error("updateTodo error:", error);
    throw new AppError("Failed to update todo", 400);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    return await deleteData(prisma.todoItem, { id });
  } catch (error) {
    console.error("deleteTodo error:", error);
    throw new AppError("Failed to delete todo", 400);
  }
};

export const completeTodo = async (id: string) => {
  try {
    return await updateData(
      prisma.todoItem,
      { id },
      { isCompleted: true, progress: 100 }
    );
  } catch (error) {
    console.error("completeTodo error:", error);
    throw new AppError("Failed to complete todo", 400);
  }
};

export const updateProgress = async (id: string, progress: number) => {
  try {
    return await updateData(prisma.todoItem, { id }, { progress });
  } catch (error) {
    console.error("updateProgress error:", error);
    throw new AppError("Failed to update progress", 400);
  }
};

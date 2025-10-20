const { prisma } = require("../config/prisma");

export const getAllTodos = async (userId: string) => {
  return prisma.todoItem.findMany({ where: { ownerId: userId } });
};

export const createTodo = async (
  userId: string,
  data: { title: string; description?: string }
) => {
  return prisma.todoItem.create({
    data: { ...data, ownerId: userId },
  });
};

export const updateTodo = async (id: string, data: any) => {
  return prisma.todoItem.update({
    where: { id },
    data,
  });
};

export const deleteTodo = async (id: string) => {
  return prisma.todoItem.delete({ where: { id } });
};

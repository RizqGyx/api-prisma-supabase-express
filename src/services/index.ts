export const findAll = async (model: any, where: Record<string, any> = {}) => {
  try {
    return await model.findMany({ where });
  } catch (error) {
    console.error("Error in findAll:", error);
    throw new Error("Failed to fetch data");
  }
};

export const findOne = async (model: any, where: Record<string, any> = {}) => {
  try {
    return await model.findFirst({ where });
  } catch (error) {
    console.error("Error in findOne:", error);
    throw new Error("Failed to fetch data");
  }
};

export const createData = async (model: any, data: Record<string, any>) => {
  try {
    return await model.create({ data });
  } catch (error) {
    console.error("Error in createData:", error);
    throw new Error("Failed to create data");
  }
};

export const updateData = async (
  model: any,
  where: Record<string, any>,
  data: Record<string, any>
) => {
  try {
    return await model.update({ where, data });
  } catch (error) {
    console.error("Error in updateData:", error);
    throw new Error("Failed to update data");
  }
};

export const deleteData = async (model: any, where: Record<string, any>) => {
  try {
    return await model.delete({ where });
  } catch (error) {
    console.error("Error in deleteData:", error);
    throw new Error("Failed to delete data");
  }
};

export default {
  findAll,
  findOne,
  createData,
  updateData,
  deleteData,
};

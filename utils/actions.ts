"use server";
import Task from "@/models/Task";
import connectDB from "@/config/database";
import { revalidatePath } from "next/cache";
import { Types } from "mongoose";
import Order from "@/models/Order";
import { formSchemaServer as formSchema } from "@/zodschema/zodSchemas";
export const postTask = async (e: FormData) => {
  const rawData = Object.fromEntries(e);
  const parseTest = formSchema.safeParse(rawData);
  if (!parseTest.success) {
    return false;
  }
  try {
    await connectDB();
    const deadlineDate = new Date(parseTest.data.deadline);
    const response = await Task.create({
      title: parseTest.data.title,
      deadline: deadlineDate,
      description: parseTest.data.description,
    });
    revalidatePath("/");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const removeTask = async (e: Types.ObjectId) => {
  try {
    await connectDB();
    const response = await Task.findOneAndDelete({
      _id: e,
    }).lean();
    revalidatePath("/");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const editTask = async (e: FormData) => {
  const rawData = Object.fromEntries(e);
  const parseTest = formSchema.safeParse(rawData);
  if (!parseTest.success) {
    return false;
  }
  try {
    await connectDB();
    const deadlineDate = new Date(parseTest.data.deadline);
    const response = await Task.findOneAndUpdate(
      {
        _id: parseTest.data.id,
      },
      {
        title: parseTest.data.title,
        deadline: deadlineDate,
        description: parseTest.data.description,
      }
    );
    revalidatePath("/");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const saveOrder = async (item: Types.ObjectId[]) => {
  try {
    await connectDB();
    const resp = await Order.findOneAndReplace({}, { order: item }).lean();
    if (resp && `order` in resp) {
      revalidatePath("/");
      return JSON.parse(JSON.stringify(resp.order));
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

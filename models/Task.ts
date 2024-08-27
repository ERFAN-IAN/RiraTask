import { Schema, model, models, Types } from "mongoose";
export interface ITask {
  _id: Types.ObjectId;
  title: string;
  description: string;
  createdAt: Date;
  deadline: Date;
}
const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = models.Task || model<ITask>("Task", TaskSchema);
export default Task;

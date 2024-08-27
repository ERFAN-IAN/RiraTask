import { Schema, model, models, Types } from "mongoose";
export interface IOrder {
  _id: Types.ObjectId;
  order: Types.ObjectId[];
}
const OrderSchema = new Schema<IOrder>(
  {
    order: [
      {
        type: Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const Order = models.Order || model<IOrder>("Order", OrderSchema);
export default Order;

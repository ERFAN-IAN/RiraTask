import WallOptions from "./WallOptions";
import WallTable from "./WallTable";
import connectDB from "@/config/database";
import Task from "@/models/Task";
import Order from "@/models/Order";
import { dataSchema, OrderType } from "@/zodschema/zodSchemas";
import { orderSchema } from "@/zodschema/zodSchemas";
import { DataType } from "@/zodschema/zodSchemas";
import { CardView } from "./CardView";
async function getData(): Promise<DataType[]> {
  try {
    await connectDB();
    const resp: DataType[] = await Task.find({});
    return resp;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getOrder(): Promise<OrderType> {
  try {
    await connectDB();
    const resp: OrderType = await Order.find({});
    return resp;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export default async function DemoPage() {
  let parsedData: DataType[];
  try {
    const data = await getData();
    dataSchema.array().parse(data);

    const orderData = await getOrder();
    orderSchema.parse(orderData);
    const orderKeys = orderData[0].order;
    const dataSorted = data.toSorted((a, b) => {
      return orderKeys.indexOf(a._id) - orderKeys.indexOf(b._id);
    });
    const transformedData: DataType[] = JSON.parse(JSON.stringify(dataSorted));
    parsedData = transformedData;
  } catch (error) {
    console.error(error);
    return (
      <div className="w-full min-h-[90vh] flex justify-center items-center">
        <p>There was an error</p>
      </div>
    );
  }
  return (
    //The key on CardView is for reseting the useState inside the component, otherwise the order of cards might not be correct
    <div className="mt-20">
      <WallOptions />
      <WallTable data={parsedData} />
      <CardView data={parsedData} key={Math.random()} />
    </div>
  );
}

import Task from "@/models/Task";
import React from "react";
import connectDB from "@/config/database";
import { dataSchema } from "@/zodschema/zodSchemas";
import EditPageComp from "@/components/EditPageComp";
import { DataType } from "@/zodschema/zodSchemas";
const page = async ({ params }: { params: { id: string[] } }) => {
  let data: DataType;
  try {
    await connectDB();
    const rawData: DataType[] = await Task.find({ _id: params.id[0] });
    const parseTest = dataSchema.safeParse(rawData[0]);
    if (!parseTest.success) {
      return <p>There was an error</p>;
    }
    data = JSON.parse(JSON.stringify(parseTest.data));
  } catch (error) {
    console.log(error);
    return <p>There was an error</p>;
  }
  return (
    <EditPageComp
      data={data}
      id={params.id[0]}
      //the key below is for updating form default values
      key={data.title + data.description + data.deadline.toString()}
    />
  );
};

export default page;

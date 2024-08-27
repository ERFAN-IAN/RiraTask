import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DataType } from "@/zodschema/zodSchemas";
export default async function WallTable({ data }: { data: DataType[] }) {
  return (
    <div className=" mx-auto mt-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

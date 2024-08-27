import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { removeTask } from "@/utils/actions";
import { DataType } from "@/zodschema/zodSchemas";
import { toast } from "@/components/ui/use-toast";
const TableOptionsCell = ({ rowData }: { rowData: DataType }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 bg-zinc-100 text-black">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={async () => {
            router.push(`/${rowData._id}`);
          }}
          className="  cursor-pointer"
        >
          Edit Task
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            if (rowData._id) {
              const resp = await removeTask(rowData._id);
              if (!resp) {
                toast({
                  variant: "destructive",
                  title: "Uh oh! Something went wrong.",
                  description: "There was a problem with your request.",
                });
              }
              if (resp) {
                toast({
                  variant: "default",
                  title: "Task deleted",
                });
              }
            }
          }}
          className=" text-red-600 focus:text-red-600 cursor-pointer"
        >
          Delete Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableOptionsCell;

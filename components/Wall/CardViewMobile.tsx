"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { removeTask } from "@/utils/actions";
import { useGlobalContext } from "@/context/Context";
import { useRef } from "react";
import { DataType } from "@/zodschema/zodSchemas";
import { toast } from "@/components/ui/use-toast";
export function CardViewMobile({ data }: { data: DataType[] }) {
  const { layout, order, setOrder, setIsOrderChanged } = useGlobalContext();
  const dragItem = useRef<number>(0);
  const draggedOverItem = useRef<number>(0);
  const [dataOrdered, setDataOrdered] = React.useState(data);
  function handleSort() {
    const arrayClone = [...dataOrdered];
    const arrayClone2 = [...arrayClone];
    const temp = arrayClone[dragItem.current];
    arrayClone[dragItem.current] = arrayClone[draggedOverItem.current];
    arrayClone[draggedOverItem.current] = temp;
    const arrayIds = arrayClone.map((item) => item._id);
    const arrayIds2 = arrayClone2.map((item) => item._id);
    setOrder(arrayIds);
    for (let i = 0; i < arrayIds.length; i++) {
      //check to see if the order has changed
      if (order.length === 0) {
        if (arrayIds[i] !== arrayIds2[i]) {
          setIsOrderChanged(true);
          break;
        }
      } else {
        if (arrayIds[i] !== order[i]) {
          setIsOrderChanged(true);
          break;
        }
      }
    }
    setDataOrdered(arrayClone);
  }
  const router = useRouter();
  return (
    <div
      className={` grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${
        layout === `grid` ? `grid` : `hidden`
      }`}
    >
      {dataOrdered.map((item, index: number) => (
        <Card
          draggable
          onDragStart={() => (dragItem.current = index)}
          onDragEnter={() => (draggedOverItem.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
          className={`w-full border-primary cursor-pointer flex flex-col justify-between ${
            new Date(item.deadline).toDateString() ===
              new Date().toDateString() &&
            `bg-red-500 text-white hover:bg-red-600`
          }`}
          key={item._id.toString()}
          onClick={() => {
            router.push(`/${item._id}`);
          }}
        >
          <CardHeader>
            <CardTitle className="text-center">
              {`${item.title.slice(0, 25)}${
                item.title.length >= 24 ? `...` : ""
              }`}
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <CardDescription
              className={`${
                new Date(item.deadline).toDateString() ===
                  new Date().toDateString() && ` text-white `
              }`}
            >
              {`${item.description.slice(0, 100)}${
                item.description.length >= 99 ? `...` : ""
              }`}
            </CardDescription>
          </CardContent>

          <CardFooter className="flex w-full pl-0 justify-between">
            <CardContent>
              <div className="mt-4 text-sm">
                <p className="">
                  Created At: {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <p>Deadline: {new Date(item.deadline).toLocaleDateString()}</p>
              </div>
            </CardContent>
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="">
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0 text-black bg-zinc-100"
                  >
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className=""
                  onClick={async (e) => {
                    e.stopPropagation();
                  }}
                >
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={async () => {
                      router.push(`/${item._id}`);
                    }}
                    className=" cursor-pointer"
                  >
                    Edit Task
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      if (item._id) {
                        const resp = await removeTask(item._id);
                        if (!resp) {
                          toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description:
                              "There was a problem with your request.",
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
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

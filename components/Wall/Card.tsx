"use client";
import React, { useState } from "react";
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
import { toast } from "@/components/ui/use-toast";
import { MoreHorizontal } from "lucide-react";
import { removeTask } from "@/utils/actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { Types } from "mongoose";
type GridCardProps = {
  id: Types.ObjectId;
  index: number;
  deadline: Date;
  description: string;
  title: string;
  createdAt: Date;
  dragItem: React.MutableRefObject<number>;
  draggedOverItem: React.MutableRefObject<number>;
  handleSort: () => void;
};
const GridCard = ({
  id,
  index,
  deadline,
  description,
  title,
  createdAt,
  dragItem,
  draggedOverItem,
  handleSort,
}: GridCardProps) => {
  const router = useRouter();
  const [isRed, setIsRed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // This useEffect is to make sure we wont have hydration errors on client and server
    if (
      new Date(new Date(deadline).toISOString()).toDateString() ===
      new Date(new Date().toISOString()).toDateString()
    ) {
      setIsRed(true);
    }
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return (
      <div>
        <Skeleton className="w-full h-[18rem] rounded-md" />
      </div>
    );
  }
  return (
    <Card
      draggable
      onDragStart={() => (dragItem.current = index)}
      onDragEnter={() => (draggedOverItem.current = index)}
      onDragEnd={handleSort}
      onDragOver={(e) => e.preventDefault()}
      suppressHydrationWarning
      className={`w-full border-primary cursor-pointer flex flex-col justify-between ${
        isRed && `bg-red-500 text-white hover:bg-red-600`
      }`}
      onClick={() => {
        router.push(`/${id}`);
      }}
    >
      <CardHeader>
        <CardTitle className="text-center">
          {`${title.slice(0, 25)}${title.length >= 24 ? `...` : ""}`}
        </CardTitle>
      </CardHeader>
      <CardContent className="" suppressHydrationWarning>
        <CardDescription
          suppressHydrationWarning
          className={`${
            new Date(new Date(deadline).toISOString()).toDateString() ===
              new Date(new Date().toISOString()).toDateString() &&
            ` text-white `
          }`}
        >
          {`${description.slice(0, 100)}${
            description.length >= 99 ? `...` : ""
          }`}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex w-full pl-0 justify-between">
        <CardContent>
          <div className="mt-4 text-sm">
            <p className="">
              Created At: {new Date(createdAt).toLocaleDateString()}
            </p>
            <p>Deadline: {new Date(deadline).toLocaleDateString()}</p>
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
                  router.push(`/${id}`);
                }}
                className=" cursor-pointer"
              >
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  if (id) {
                    const resp = await removeTask(id);
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
        </div>
      </CardFooter>
    </Card>
  );
};

export default GridCard;

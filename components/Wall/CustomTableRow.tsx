"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { Skeleton } from "../ui/skeleton";
import { useState, useEffect } from "react";
import { DataType } from "@/zodschema/zodSchemas";
import { Cell } from "@tanstack/react-table";
export default function CustomTableRow<
  T extends {
    id: string;
    getIsSelected: () => boolean;
    getValue: (columnId: string) => string | number | Date;
    getVisibleCells: () => Cell<j, unknown>[];
  },
  k,
  j
>({ row, data }: { row: T; data: k }): React.JSX.Element {
  // For getting row id to give to router.push
  const [isRed, setIsRed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // This useEffect is to make sure red bg is applied correctly on deployment
    if (
      new Date(
        new Date(row.getValue("deadline")).toISOString()
      ).toDateString() === new Date(new Date().toISOString()).toDateString()
    ) {
      setIsRed(true);
    }
    setIsMounted(true);
  }, []);
  const dataForRouter = data as DataType[];
  const router = useRouter();
  if (!isMounted) {
    return <tr></tr>;
  }
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      suppressHydrationWarning
      className={`grid grid-cols-10 border-primary  ${
        isRed && `bg-red-500 text-white hover:bg-red-600`
      }`}
    >
      {row.getVisibleCells().map((cell, index) => {
        return (
          <TableCell
            key={cell.id}
            className={` col-span-2 cursor-pointer ${
              cell.id.endsWith(`actions`) &&
              `col-span-2 cursor-auto flex justify-center`
            }  ${cell.id.endsWith(`description`) && ` col-span-3`} ${
              cell.id.endsWith(`deadline`) && ` col-span-1`
            } `}
            onClick={(e) => {
              if (cell.id.endsWith(`actions`)) {
                return;
              }
              router.push(`/${dataForRouter[parseInt(row.id)]._id}`);
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

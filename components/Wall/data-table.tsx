"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
export const dynamic = "force-dynamic";
import { useGlobalContext } from "@/context/Context";
import { DataType } from "@/zodschema/zodSchemas";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // This useEffect is to make sure we wont have hydration errors on client and server
    setIsMounted(true);
  }, []);
  // For getting row id to give to router.push
  const dataForRouter = data as DataType[];
  const { layout } = useGlobalContext();
  const router = useRouter();
  if (!isMounted && layout === "table") {
    return <Skeleton className="w-full h-[3rem]" />;
  }
  return (
    <div
      className={`rounded-md border mytable ${
        layout === `grid` ? `hidden` : `table`
      }`}
    >
      <Table className={``}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="grid grid-cols-10">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={`${
                      header.id === `description` ? `col-span-3` : `col-span-2`
                    } ${
                      header.id === `actions` && `col-span-1`
                    }   flex flex-col justify-center`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="" suppressHydrationWarning>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                suppressHydrationWarning
                className={`grid grid-cols-10 border-primary  ${
                  new Date(
                    new Date(row.getValue("deadline")).toISOString()
                  ).toDateString() ===
                    new Date(new Date().toISOString()).toDateString() &&
                  `bg-red-500 text-white hover:bg-red-600`
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                There are no open Tasks
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

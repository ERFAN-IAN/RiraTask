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
import CustomTableRow from "./CustomTableRow";
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
export const dynamic = "force-dynamic";
import { useGlobalContext } from "@/context/Context";
import { DataType } from "@/zodschema/zodSchemas";
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const dataForKey = data as DataType[];
  const { layout } = useGlobalContext();
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

        <TableBody
          className=""
          key={dataForKey.reduce((prev, item) => prev + item._id, "")}
        >
          {/* the key is for making sure the order of rows is always correct and synced up, removing it makes the row colors not work properly */}
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <CustomTableRow<typeof row, TData[], TData>
                  row={row}
                  data={data}
                  key={row.id}
                />
              );
            })
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

// "use client";
// import { ColumnDef } from "@tanstack/react-table";
// import { ITask } from "@/models/Task";
// import TableOptionsCell from "./TableOptionsCell";
// export const columns: ColumnDef<ITask>[] = [
//   {
//     accessorKey: "title",
//     header: "Title",
//     cell: ({ row }) => {
//       const title: string = row.getValue("title");
//       return (
//         <div className="text-left font-medium">
//           <p className="">
//             {`${title.slice(0, 40)}${title.length >= 99 ? `...` : ""}`}
//           </p>
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "description",
//     header: () => <p>Description</p>,
//     cell: ({ row }) => {
//       const description: string = row.getValue("description");
//       return (
//         <div className="text-left font-medium">
//           <p className="">
//             {`${description.slice(0, 120)}${
//               description.length >= 119 ? `...` : ""
//             }`}
//           </p>
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "createdAt",
//     header: "Created",
//     cell: ({ row }) => {
//       const createdAt: Date = row.getValue("createdAt");
//       return (
//         <div className="text-left font-medium">
//           <p className=""> {new Date(createdAt).toLocaleDateString()}</p>
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "deadline",
//     header: "Deadline",
//     cell: ({ row }) => {
//       const deadline: Date = row.getValue("deadline");
//       return (
//         <div className="text-left font-medium flex flex-col justify-center align-center">
//           <p className=""> {new Date(deadline).toLocaleDateString()}</p>
//         </div>
//       );
//     },
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const rowData = row.original;
//       return <TableOptionsCell rowData={rowData} />;
//     },
//   },
// ];

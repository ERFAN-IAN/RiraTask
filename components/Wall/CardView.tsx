"use client";
import * as React from "react";

import GridCard from "./Card";
import { useGlobalContext } from "@/context/Context";

import { DataType } from "@/zodschema/zodSchemas";
export const dynamic = "force-dynamic";
import { useRef } from "react";
export function CardView({ data }: { data: DataType[] }) {
  const { order, setOrder, setIsOrderChanged, layout } = useGlobalContext();
  const [dataOrdered, setDataOrdered] = React.useState(data);

  const dragItem = useRef<number>(0);
  const draggedOverItem = useRef<number>(0);
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
  return (
    <div
      className={`grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4 ${
        layout === `grid` ? `grid` : `hidden`
      }`}
    >
      {dataOrdered.map((item, index: number) => {
        return (
          <GridCard
            index={index}
            id={item._id}
            deadline={item.deadline}
            description={item.description}
            title={item.title}
            createdAt={item.createdAt}
            key={item._id.toString()}
            dragItem={dragItem}
            draggedOverItem={draggedOverItem}
            handleSort={handleSort}
          />
        );
      })}
    </div>
  );
}

"use client";
import { Types } from "mongoose";
import React, { createContext, useContext, useState } from "react";
type GlobalContextType = {
  isAddTaskModalOpen: boolean;
  setIsAddTaskModalOpen: (state: boolean) => void;
  layout: "grid" | "table";
  setLayout: React.Dispatch<React.SetStateAction<"grid" | "table">>;
  order: Types.ObjectId[];
  setOrder: React.Dispatch<React.SetStateAction<Types.ObjectId[]>>;
  isOrderChanged: boolean;
  setIsOrderChanged: React.Dispatch<React.SetStateAction<boolean>>;
};
const context = createContext<undefined | GlobalContextType>(undefined);

export const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);
  const [layout, setLayout] = useState<"grid" | "table">("grid");
  const [order, setOrder] = useState<Types.ObjectId[]>([]);
  const [isOrderChanged, setIsOrderChanged] = React.useState<boolean>(false);
  return (
    <context.Provider
      value={{
        isAddTaskModalOpen,
        setIsAddTaskModalOpen,
        layout,
        setLayout,
        order,
        setOrder,
        isOrderChanged,
        setIsOrderChanged,
      }}
    >
      {children}
    </context.Provider>
  );
};
export const useGlobalContext = () => {
  const contexxt = useContext(context);
  if (typeof contexxt === "undefined") {
    throw new Error("context is undefined");
  }
  return contexxt;
};

"use client";
import React from "react";
import { useGlobalContext } from "@/context/Context";
const ModalBackground = () => {
  const { isAddTaskModalOpen, setIsAddTaskModalOpen } = useGlobalContext();
  return (
    <div
      className={`fixed inset-0 h-[110%]  opacity-50 z-[5] pointer-events-none transition-all duration-150 ${
        isAddTaskModalOpen && `pointer-events-auto bg-black`
      }`}
      onClick={() => {
        setIsAddTaskModalOpen(false);
        document.body.style.overflowY = "visible";
      }}
    ></div>
  );
};

export default ModalBackground;

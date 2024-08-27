"use client";
import React from "react";
import { Button } from "../ui/button";
import { useGlobalContext } from "@/context/Context";
import { LayoutGrid, Rows3 } from "lucide-react";
import { saveOrder } from "@/utils/actions";
import { DarkModeToggle } from "../DarkModeToggle";
const WallOptions = () => {
  const {
    isAddTaskModalOpen,
    setIsAddTaskModalOpen,
    setLayout,
    layout,
    isOrderChanged,
    setIsOrderChanged,
    order,
  } = useGlobalContext();
  return (
    <div className=" mb-2">
      <div className="flex justify-end gap-x-2">
        <Button
          onClick={() => {
            setIsAddTaskModalOpen(true);
            document.body.style.overflowY = "hidden";
          }}
        >
          Add Task
        </Button>
        <Button
          onClick={() => setLayout(layout === "grid" ? "table" : "grid")}
          className="hidden md:block"
        >
          {layout === `grid` ? <Rows3 /> : <LayoutGrid />}
        </Button>
        <DarkModeToggle />
      </div>
      <div className="w-full flex justify-end mt-2">
        {layout === "grid" && (
          <Button
            onClick={async () => {
              await saveOrder(order);
              setIsOrderChanged(false);
            }}
            disabled={!isOrderChanged}
          >
            on Desktop: Save Drag and Drop Order
          </Button>
        )}
      </div>
    </div>
  );
};

export default WallOptions;

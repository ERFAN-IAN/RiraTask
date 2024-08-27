"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/context/Context";
const loading = () => {
  const { layout } = useGlobalContext();
  return (
    <div>
      {layout === "grid" && (
        <div>
          <div>
            <div className="flex justify-end mt-[5rem] gap-2">
              <Skeleton className="w-[6rem] h-[2.5rem] rounded-md" />

              <Skeleton className="w-[4rem] h-[2.5rem] rounded-md" />
              <Skeleton className="w-[3rem] h-[2.5rem] rounded-md" />
            </div>
            <div className="flex justify-end mt-2">
              <Skeleton className="w-[18rem] h-[2.5rem] rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div>
              <Skeleton className="w-full h-[18rem] rounded-md" />
            </div>
            <div>
              <Skeleton className="w-full h-[18rem] rounded-md" />
            </div>
            <div>
              <Skeleton className="w-full h-[18rem] rounded-md" />
            </div>
            <div>
              <Skeleton className="w-full h-[18rem] rounded-md" />
            </div>
            <div>
              <Skeleton className="w-full h-[18rem] rounded-md" />
            </div>
            <div>
              <Skeleton className="w-full h-[18rem] rounded-md" />
            </div>
          </div>
        </div>
      )}
      {layout === "table" && (
        <div>
          <div className="flex justify-end mt-[5rem] gap-2">
            <Skeleton className="w-[6rem] h-[2.5rem] rounded-md" />

            <Skeleton className="w-[4rem] h-[2.5rem] rounded-md" />
            <Skeleton className="w-[3rem] h-[2.5rem] rounded-md" />
          </div>
          <div className="flex justify-end mt-2">
            <Skeleton className="w-[18rem] h-[2.5rem] rounded-md" />
          </div>
          <div className="flex flex-col w-full">
            <Skeleton className="w-full h-[3rem] rounded-md mt-4" />
            <Skeleton className="w-full h-[4rem] rounded-md mt-1" />
            <Skeleton className="w-full h-[4rem] rounded-md mt-1" />
            <Skeleton className="w-full h-[4rem] rounded-md mt-1" />
            <Skeleton className="w-full h-[4rem] rounded-md mt-1" />
            <Skeleton className="w-full h-[4rem] rounded-md mt-1" />
            <Skeleton className="w-full h-[4rem] rounded-md mt-1" />
            <Skeleton className="w-full h-[4rem] rounded-md mt-1" />
            <Skeleton className="w-full h-[4rem] rounded-md mt-1" />
            <Skeleton className="w-full h-[4rem] rounded-md mt-1" />
          </div>
        </div>
      )}
    </div>
  );
};

export default loading;

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
const loading = () => {
  return (
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
  );
};

export default loading;

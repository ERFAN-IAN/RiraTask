import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
const loading = () => {
  return (
    <div>
      <div>
        <div className="flex justify-start mt-[5rem] gap-2">
          <Skeleton className="w-[3rem] h-[2.5rem] rounded-md" />
        </div>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2 gap-4 mt-4">
        <div>
          <Skeleton className="w-full h-[6.5rem] md:h-[35rem] rounded-md" />
        </div>
        <div>
          <Skeleton className="w-full h-[40rem] md:h-[35rem] rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default loading;

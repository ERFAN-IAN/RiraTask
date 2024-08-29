import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";

const loading = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-start mt-10">
        <div className=" cursor-pointer">
          <ChevronLeft />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ">
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-[15rem] h-[1.5rem]" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <Skeleton className="w-[10rem] h-[1.5rem]" />

            <Skeleton className="w-full h-[30rem]" />
          </CardContent>
        </Card>
        <Card className={`border-primary`}>
          <CardHeader>
            <CardTitle className="text-center">Edit Task</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex-col flex gap-y-8">
              <div>
                <Skeleton className="w-[3rem] h-[1rem]" />
                <Skeleton className="w-full h-[2.5rem] mt-4" />
              </div>
              <div className="flex flex-col">
                <Skeleton className="w-[4rem] h-[1rem]" />
                <Skeleton className="w-full h-[2.5rem] mt-4" />
              </div>
              <div>
                <Skeleton className="w-[5rem] h-[1rem]" />
                <Skeleton className="w-full h-[13rem] mt-4" />
              </div>
              <div className="flex justify-end gap-x-2">
                <Skeleton className="w-[5.7rem] h-[2.5rem]" />
                <Skeleton className="w-[7rem] h-[2.5rem]" />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default loading;

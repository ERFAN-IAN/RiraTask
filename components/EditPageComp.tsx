"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { editTask, removeTask } from "@/utils/actions";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formSchema } from "@/zodschema/zodSchemas";
import mongoose from "mongoose";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { DataType } from "@/zodschema/zodSchemas";
import { toast } from "./ui/use-toast";
const EditPageComp = ({ data, id }: { data: DataType; id: string }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title,
      description: data.description,
      deadline: new Date(data.deadline),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("deadline", values.deadline.toString());
    formData.append("description", values.description);
    formData.append("id", id);
    setIsSubmitting(true);
    const resp = await editTask(formData);
    setIsSubmitting(false);
    if (!resp) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      return;
    }
    toast({
      variant: "default",
      title: "Task Edited",
    });
    form.reset();
  }
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-start mt-10">
        <div className=" cursor-pointer" onClick={() => router.back()}>
          <ChevronLeft />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ">
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>{data.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <p suppressHydrationWarning>
              Deadline: {new Date(data.deadline).toLocaleDateString()}
            </p>
            <p>{data.description}</p>
          </CardContent>
        </Card>
        <Card className={`border-primary`}>
          <CardHeader>
            <CardTitle className="text-center">Edit Task</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Deadline</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                " pl-3 text-left font-normal  w-full",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? format(field.value, "PPP")
                                : format(data.deadline, "PPP")}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                          suppressHydrationWarning
                        >
                          <Calendar
                            mode="single"
                            selected={field.value || data.deadline}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                                new Date(
                                  new Date().valueOf() - 1000 * 60 * 60 * 24
                                ) || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={10} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <div className="flex justify-end gap-x-2">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Edit Task
                  </Button>
                  <Button
                    type="button"
                    disabled={isDeleting}
                    onClick={async () => {
                      setIsDeleting(true);
                      const transformedID: mongoose.Types.ObjectId = JSON.parse(
                        JSON.stringify(new mongoose.Types.ObjectId(id))
                      );
                      const resp = await removeTask(transformedID);
                      if (!resp) {
                        toast({
                          variant: "destructive",
                          title: "Uh oh! Something went wrong.",
                          description: "There was a problem with your request.",
                        });
                      }
                      if (resp) {
                        toast({
                          variant: "default",
                          title: "Task deleted",
                        });
                      }
                      setIsDeleting(false);
                      router.push("/");
                    }}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    {isDeleting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Delete Task
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditPageComp;

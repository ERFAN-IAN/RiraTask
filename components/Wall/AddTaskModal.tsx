"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { postTask } from "@/utils/actions";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useGlobalContext } from "@/context/Context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { saveOrder } from "@/utils/actions";
import { formSchema } from "@/zodschema/zodSchemas";
export function AddTaskModal() {
  const { toast } = useToast();
  const {
    isAddTaskModalOpen,
    setIsAddTaskModalOpen,
    setIsOrderChanged,
    order,
  } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("deadline", values.deadline.toString());
    formData.append("description", values.description);
    setIsSubmitting(true);
    try {
      await saveOrder(order);
      setIsOrderChanged(false);
      const resp: boolean = await postTask(formData);
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
        title: "Task Added",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      setIsSubmitting(false);
      document.body.style.overflowY = "visible";
      return;
    }

    document.body.style.overflowY = "visible";
    setIsSubmitting(false);
    form.reset();
    setIsAddTaskModalOpen(false);
  }
  return (
    <Card
      className={`w-[350px] fixed z-[10] opacity-0 transition-opacity duration-150 pointer-events-none ${
        isAddTaskModalOpen && `opacity-100 pointer-events-auto`
      }  top-[10%] left-[50%] translate-x-[-50%]`}
    >
      <CardHeader>
        <CardTitle className="text-center">Add Task</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a future date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Task description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => {
                  setIsAddTaskModalOpen(false);
                  document.body.style.overflowY = "visible";
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

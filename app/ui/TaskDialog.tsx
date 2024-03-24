"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

const taskSchema = z.object({
  CompanyID: z.string({ required_error: "Please select the company" }),
  FirstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  LastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  Email: z.string().email({
    message: "Email is required",
  }),
  // PhoneNumber: z.string().min(4, {
  //   message: "Phone number must be at least 4 characters.",
  // }),
  // ContactType: z.string(),
});

export default function TaskDialog() {
  const [subTasks, setSubTasks] = useState([0, 1]);

  const form = useForm({
    resolver: zodResolver(taskSchema),
    // defaultValues: {
    //   CompanyID: "",
    // },
  });

  const onSubmit = (values: any) => {
    console.log(values);
    // createContact(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-[#635FC7] hover:opacity-30 hover:bg-[#635FC7]">
          <Plus className="h-4 w-4" /> Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="e.g. Take coffe break"
                    />
                  </FormControl>
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
                    <Textarea
                      {...field}
                      placeholder="e.g. This 15 minute break will charge the batteries"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtasks[]"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtasks</FormLabel>
                  <FormControl>
                    <>
                      {subTasks?.map((subTask) => (
                        <div className="flex justify-between">
                          <Input
                            type="text"
                            {...field}
                            className="w-full max-w-sm"
                            placeholder="e.g. Take coffe break"
                          />
                          <Button variant="outline" size="icon">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full rounded-full bg-[#A8A4FF]">
              <Plus className="h-4 w-4" /> Add New Subtask
            </Button>
            <FormField
              control={form.control}
              name="CompanyID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Connected Company" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full rounded-full bg-[#635FC7] hover:opacity-30 hover:bg-[#635FC7]">
              <Plus className="h-4 w-4" /> Create Task
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

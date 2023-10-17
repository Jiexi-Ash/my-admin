"use client";
import React from "react";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { trpc } from "@/app/_trpc/client";
import Loader from "../Loader";

const forSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  campus: z.string().min(2, { message: "Campus is required" }),
});

function AddFaculty() {
  const form = useForm<z.infer<typeof forSchema>>({
    resolver: zodResolver(forSchema),
    defaultValues: {
      name: "",
      campus: "",
    },
  });

  const { mutate: createModule } = trpc.createModule.useMutation({
    onSuccess: (data) => {
      form.reset();
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const utils = trpc.useContext();

  const onSubmit = async (data: z.infer<typeof forSchema>) => {
    const { name, campus } = data;
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#15305d] text-white max-w-fit">
          Add Faculty
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-auto w-full">
        <DialogTitle className="text-2xl">Add Faculty</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Module</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g Information Technology"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="campus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Module</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g Midrand" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-10 flex space-x-4">
              <Button type="submit" className="text-white bg-[#15305d]">
                {/* {isLoading ? <Loader /> : "Add Lecturer"} */}
                Add Module
              </Button>
              <Button variant="outline" className="">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddFaculty;

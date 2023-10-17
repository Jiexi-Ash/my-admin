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
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { CheckCheckIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { CommandGroup } from "cmdk";
import { trpc } from "@/app/_trpc/client";
import Loader from "../Loader";

const campus = [
  { label: "NTL", value: "National" },
  { label: "MDR", value: "Midrand" },
  { label: "DBN", value: "Durban" },
  { label: "CPT Clare", value: "Cape Town - Claremont" },
  { label: "CPT TGV", value: "Cape Town - Tyger Valley" },
  { label: "ELN", value: "East London" },
  { label: "BLOEM", value: "Bloemfontein" },
  { label: "BFV", value: "Bedfordview" },
  { label: "VDB", value: "Vanderbijlpark" },
  { label: "PTA", value: "Pretoria" },
  { label: "MBO", value: "Mbombela" },
];

const position = [
  { label: "PERM", value: "Permanent" },
  { label: "CONT", value: "Contract" },
];

const forSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  code: z.string().min(2, { message: "Code is required" }),
  contentWriter: z.string().min(10, { message: "Content Writer is required" }),
  copyEditor: z.string().min(10, { message: "Copy Editor is required" }),
  lecturerHours: z.coerce.number(),
  tutorialHours: z.coerce.number(),
  practicalHours: z.coerce.number(),
  faculty: z.string().min(2, { message: "Faculty is required" }),
});

function AddModule() {
  const form = useForm<z.infer<typeof forSchema>>({
    resolver: zodResolver(forSchema),
    defaultValues: {
      name: "",
      code: "",
      contentWriter: "",
      copyEditor: "",
      faculty: "",
      lecturerHours: 0,
      tutorialHours: 0,
      practicalHours: 0,
    },
  });

  const utils = trpc.useContext();

  const onSubmit = async (data: z.infer<typeof forSchema>) => {
    const {
      name,
      code,
      contentWriter,
      copyEditor,
      faculty,
      lecturerHours,
      tutorialHours,
      practicalHours,
    } = data;

    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#15305d] text-white max-w-fit">
          Add Module
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-auto w-full  max-w-3xl">
        <DialogTitle className="text-2xl">Add Module</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Module</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g Computer skills" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Module Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g ITSKA1-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contentWriter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Writer</FormLabel>
                    <FormControl>
                      <Input placeholder="enter name and surname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="copyEditor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copy Editor</FormLabel>
                    <FormControl>
                      <Input placeholder="enter name and surname " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="faculty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Faculty</FormLabel>
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
                name="lecturerHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lecturer Hours</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="tutorialHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tutorial Hours</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="practicalHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Practical Hours</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

export default AddModule;

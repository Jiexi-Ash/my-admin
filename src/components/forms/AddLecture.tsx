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
  email: z.string().email().includes("@eduvos.com"),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  title: z.string().min(2).max(50),
  faculty: z.string().min(2).max(50),
  campus: z.string({
    required_error: "Please select a campus",
  }),
  position: z.string({
    required_error: "Please select a position",
  }),
});

function AddLecture() {
  const form = useForm<z.infer<typeof forSchema>>({
    resolver: zodResolver(forSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      title: "",
      faculty: "",
      campus: "",
      position: "",
    },
  });

  const utils = trpc.useContext();

  const { mutate: createLecture, isLoading } = trpc.createLecture.useMutation({
    onSuccess: (data) => {
      console.log("success");
      console.log(data);
      utils.getLectures.invalidate();
      form.reset();
    },
    onError: (error) => {
      console.log("error");
      console.log(error);
    },
  });

  const onSubmit = async (data: z.infer<typeof forSchema>) => {
    const { email, firstName, lastName, title, faculty, campus, position } =
      data;

    createLecture({
      email,
      firstName,
      lastName,
      title,
      faculty,
      campus,
      position,
    });

    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#15305d] text-white max-w-fit">
          Add Lecturer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="text-2xl font-bold">Add Lecturer</h1>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="faculty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faculty</FormLabel>
                  <FormControl>
                    <Input placeholder="Faculty" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="campus"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Campus</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[250px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? campus.find(
                                (campus) => campus.value === field.value
                              )?.value
                            : "Select Campus"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {campus.map((campus) => (
                            <CommandItem
                              value={campus.label}
                              key={campus.value}
                              className="text-xs"
                              onSelect={() => {
                                form.setValue("campus", campus.value);
                              }}
                            >
                              <CheckCheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  campus.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {campus.value}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Position</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[250px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? position.find(
                                (position) => position.value === field.value
                              )?.value
                            : "Select Position"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {position.map((position) => (
                            <CommandItem
                              value={position.label}
                              key={position.value}
                              className="text-xs"
                              onSelect={() => {
                                form.setValue("position", position.value);
                              }}
                            >
                              <CheckCheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  position.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {position.value}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-10 flex space-x-4">
              <Button
                disabled={isLoading}
                type="submit"
                className="text-white bg-[#15305d]"
              >
                {isLoading ? <Loader /> : "Add Lecturer"}
              </Button>
              <Button disabled={isLoading} variant="outline" className="">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddLecture;

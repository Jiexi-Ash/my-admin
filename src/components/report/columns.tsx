"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

export type Report = {
  id: string;
  campus: string;
  course_shortname: string;
  assessment_name: string;
  assessment_type: string;
  course_group: string;
  student_number: string;
  grading_status: string;
  lecturer: string;
};

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "campus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-[#15305d] font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Campus
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "course_shortname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-[#15305d] font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course Shortname
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "assessment_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-[#15305d] font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assessment Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "assessment_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-[#15305d] font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assessment Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "course_group",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-[#15305d] font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course Group
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "student_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-[#15305d] font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "grading_status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-[#15305d] font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Grading Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const gradingStatus = row.getValue("grading_status");

      return (
        <div
          className={`border py-2  text-center rounded-lg text-white text-xs ${
            gradingStatus === "Graded" ? "bg-green-400/80 " : "bg-red-500"
          }`}
        >
          {gradingStatus}
        </div>
      );
    },
  },
  {
    accessorKey: "lecturer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-[#15305d] font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          lecturer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

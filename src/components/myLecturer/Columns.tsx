"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Lecturer = {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  campus: string;
  faculty: string;
  position: string;
  ttName: string;
};

export const columns: ColumnDef<Lecturer>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "campus",
    header: "Campus",
  },
  {
    accessorKey: "faculty",
    header: "Faculty",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "ttName",
    header: "TT Name",
  },
];

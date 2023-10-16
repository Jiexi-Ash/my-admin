"use client";
import { trpc } from "@/app/_trpc/client";
import React from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";

function Lecturers() {
  const { data: lectureData, isLoading } = trpc.getLectures.useQuery();
  console.log(lectureData);

  return (
    <div>
      {!isLoading && lectureData && (
        <DataTable columns={columns} data={lectureData} />
      )}
    </div>
  );
}

export default Lecturers;

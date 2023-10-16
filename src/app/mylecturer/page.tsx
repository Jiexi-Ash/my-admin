import AddLecture from "@/components/forms/AddLecture";
import React from "react";
import { trpc } from "../_trpc/client";
import Lecturers from "@/components/myLecturer/Lecturers";

function LecturerPage() {
  return (
    <div className="w-full min-h-screen px-10">
      <div className="flex flex-col space-y-4 mt-10">
        <div className="w-full flex justify-end">
          <AddLecture />
        </div>
        <Lecturers />
      </div>
    </div>
  );
}

export default LecturerPage;

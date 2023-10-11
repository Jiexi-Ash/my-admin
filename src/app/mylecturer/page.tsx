import AddLecture from "@/components/forms/AddLecture";
import React from "react";

function LecturerPage() {
  return (
    <div className="w-full min-h-screen px-10">
      <div className="flex flex-col space-y-4 mt-10">
        <div className="w-full flex justify-end">
          <AddLecture />
        </div>
      </div>
    </div>
  );
}

export default LecturerPage;

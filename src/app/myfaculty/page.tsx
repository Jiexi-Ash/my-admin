import AddFaculty from "@/components/forms/AddFaculty";
import React from "react";

function FacultyPage() {
  return (
    <div className="w-full min-h-screen px-10">
      <div className="flex flex-col space-y-4 mt-10">
        <div className="w-full flex justify-end">
          <AddFaculty />
        </div>
        {/* add table */}
      </div>
    </div>
  );
}

export default FacultyPage;

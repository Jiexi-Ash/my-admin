"use client";
import DataTable from "@/components/report/DataTable";
import { columns } from "@/components/report/columns";
import CampusList from "@/components/report/CampusList";
import useReportStore from "@/store/reportStore";
import FileUpload from "@/components/report/FileUpload";

function MyReportPage() {
  const { campusData } = useReportStore();

  return (
    <div className="w-full my-10 px-36 flex flex-col space-y-10 min-h-screen">
      <FileUpload />
      <CampusList />
      <div className="">
        <DataTable columns={columns} data={campusData} />
      </div>
    </div>
  );
}

export default MyReportPage;

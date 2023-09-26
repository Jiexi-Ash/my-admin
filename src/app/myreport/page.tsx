"use client";
import { useState, useEffect } from "react";

import reportData from "@/report.json";

import DataTable from "@/components/report/DataTable";
import { columns } from "@/components/report/columns";
import CampusList from "@/components/report/CampusList";
import type { Report } from "@/types";
import useReportStore from "@/store/reportStore";

function MyReportPage() {
  const { getSelectedCampusData } = useReportStore();
  const [selectedCampus, setSelectedCampus] = useState("Bedfordview Campus");
  const data = getSelectedCampusData();

  const handleSelectedCampus = (campusName: string) => {
    setSelectedCampus(campusName);
  };

  return (
    <div className="w-full my-10 px-36 flex flex-col space-y-10 min-h-screen">
      <CampusList
        selectedCampus={selectedCampus}
        setSelectedCampus={setSelectedCampus}
      />
      <div className="">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default MyReportPage;

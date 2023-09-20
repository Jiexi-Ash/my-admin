"use client";
import { useState, useEffect } from "react";

import reportData from "@/report.json";

import DataTable from "@/components/report/DataTable";
import { columns } from "@/components/report/columns";
import CampusList from "@/components/report/CampusList";
import type { Report } from "@/types";

function MyReportPage() {
  const [selectedCampus, setSelectedCampus] = useState("Midrand Campus");
  const [selectedCampusData, setSelectedCampusData] = useState<Report[]>([]);

  const handleSelectedCampus = (campusName: string) => {
    setSelectedCampus(campusName);
  };

  useEffect(() => {
    const campusData = reportData.filter(
      (item) => item.campus === selectedCampus
    );
    setSelectedCampusData(campusData);
  }, [selectedCampus]);

  return (
    <div className="w-full my-10 px-36 flex flex-col space-y-10 min-h-screen">
      <CampusList
        selectedCampus={selectedCampus}
        setSelectedCampus={setSelectedCampus}
      />
      <div className="">
        <DataTable columns={columns} data={selectedCampusData} />
      </div>
    </div>
  );
}

export default MyReportPage;

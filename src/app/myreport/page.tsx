"use client";
import React from "react";

import reportData from "@/report.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { School2Icon } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import DataTable from "@/components/report/DataTable";
import { columns } from "@/components/report/columns";

// TODO1: Card must link to myreport/[campus]
// TODO2: Add table to myreport/[campus]
// TODO3: Make Table filterable by campus, assessment, grading status

function MyReportPage() {
  const bedFordCampus = reportData.filter(
    (item) => item.campus === "Bedfordview Campus"
  );
  const midrandCampus = reportData.filter(
    (item) => item.campus === "Midrand Campus"
  );
  const PretoriaCampus = reportData.filter(
    (item) => item.campus === "Pretoria Campus"
  );
  const NelsonMandelaBayCampus = reportData.filter(
    (item) => item.campus === "Nelson Mandela Bay Campus"
  );
  const TygerValley = reportData.filter(
    (item) => item.campus === "Cape Town - Tyger Valley Campus"
  );
  const ClaremontCampus = reportData.filter(
    (item) => item.campus === "Cape Town - Claremont Campus"
  );
  const PotchefstroomCampus = reportData.filter(
    (item) => item.campus === "Potchefstroom Campus"
  );
  const durbanCampus = reportData.filter(
    (item) => item.campus === "Durban Campus"
  );
  const Vanderbijlpark = reportData.filter(
    (item) => item.campus === "Vanderbijlpark Campus"
  );
  const eastLondon = reportData.filter(
    (item) => item.campus === "East London Campus"
  );
  const Bloemfontein = reportData.filter(
    (item) => item.campus === "Bloemfontein Campus"
  );
  const Mbombela = reportData.filter(
    (item) => item.campus === "Mbombela (Nelspruit) Campus"
  );

  return (
    <div className="w-full my-10 px-36 flex flex-col space-y-10 min-h-screen">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem className="border-b-0" value="overview">
          <AccordionTrigger className="bg-[#15305d] border-gray-200 border px-4 rounded-lg text-white">
            Grading Overview
          </AccordionTrigger>
          <AccordionContent className="">
            <div className="grid grid-cols-6">
              <StatCard title="Bedfordview" campusData={bedFordCampus} />
              <StatCard title="Midrand" campusData={midrandCampus} />
              <StatCard title="Pretoria" campusData={PretoriaCampus} />
              <StatCard
                title="Nelson Mandela Bay"
                campusData={NelsonMandelaBayCampus}
              />
              <StatCard title="CPT - Tyger Valley" campusData={TygerValley} />
              <StatCard title="CPT - Claremont" campusData={ClaremontCampus} />
            </div>
            <div className="grid grid-cols-6">
              <StatCard
                title="Potchefstroom"
                campusData={PotchefstroomCampus}
              />
              <StatCard title="Durban" campusData={durbanCampus} />
              <StatCard title="Vanderbijlpark" campusData={Vanderbijlpark} />
              <StatCard title="East London" campusData={eastLondon} />
              <StatCard title="CPT - Tyger Valley" campusData={TygerValley} />
              <StatCard title="CPT - Claremont" campusData={ClaremontCampus} />
            </div>
            <div className="grid grid-cols-6">
              <StatCard title="Bloemfontein" campusData={Bloemfontein} />
              <StatCard title="Mbombela (Nelspruit)" campusData={Mbombela} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="">
        <DataTable columns={columns} data={reportData} />
      </div>
    </div>
  );
}

export default MyReportPage;

interface StatCardProps {
  title: string;
  campusData: any;
}

const StatCard = ({ title, campusData }: StatCardProps) => {
  const notGraded = campusData.filter(
    (item) => item.grading_status === "Not Graded"
  );
  const graded = campusData.filter((item) => item.grading_status === "Graded");
  const totalGraded = graded.length;
  return (
    <Card className="flex bg-[#15305d] border-solid border-2 border-gray-200">
      <CardHeader className="">
        <div className="flex space-x-2 items-center">
          <School2Icon className="w-6 h-6 text-white" fill="black" />
          <div className="flex flex-col">
            <CardTitle className="text-base text-white">{title}</CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Graded | Not Graded
            </CardDescription>
          </div>
        </div>
        <CardContent className="flex items-center h-full justify-between w-full py-1">
          <div className="w-[150px] flex justify-between">
            <span className="text-3xl text-green-500">{totalGraded}</span>
            <Separator
              orientation="vertical"
              className="bg-white text-red-500 h-8 w-[2px]"
            />
            <span className="text-3xl text-red-500">{notGraded.length}</span>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

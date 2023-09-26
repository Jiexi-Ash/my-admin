"use client";
import React from "react";
import reportData from "@/report.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CampusCard from "./CampusCard";

function CampusList() {
  const campusNamesS = [
    ...new Set(reportData.map((item) => item.campus)),
  ].filter((item) => item !== "") as string[];

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem className="border-b-0" value="overview">
        <AccordionTrigger className="bg-[#15305d] border-gray-200 border px-4 rounded-lg text-white">
          Grading Overview
        </AccordionTrigger>
        <AccordionContent className="">
          <div className="grid grid-cols-6">
            {campusNamesS.map((campusName: string) => (
              <CampusCard
                key={campusName}
                campusData={reportData.filter(
                  (item) => item.campus === campusName
                )}
                title={campusName}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default CampusList;

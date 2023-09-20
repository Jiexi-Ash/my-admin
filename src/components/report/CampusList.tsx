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

interface CampusListProps {
  selectedCampus: string;
  setSelectedCampus: React.Dispatch<React.SetStateAction<string>>;
}

function CampusList({ selectedCampus, setSelectedCampus }: CampusListProps) {
  const campusNamesS = [
    ...new Set(reportData.map((item) => item.campus)),
  ].filter((item) => item !== "");

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem className="border-b-0" value="overview">
        <AccordionTrigger className="bg-[#15305d] border-gray-200 border px-4 rounded-lg text-white">
          Grading Overview
        </AccordionTrigger>
        <AccordionContent className="">
          <div className="grid grid-cols-6">
            {campusNamesS.map((campusName) => (
              <CampusCard
                key={campusName}
                selectedCampus={selectedCampus}
                campusName={campusName}
                setSelectedCampus={setSelectedCampus}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default CampusList;

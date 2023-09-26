"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { School2Icon } from "lucide-react";
import { Separator } from "../ui/separator";
import type { Report } from "@/types";
import useReportStore from "@/store/reportStore";

interface CampusCardProps {
  title: string;
}

function CampusCard({ title }: CampusCardProps) {
  const { selectedCampus, setSelectedCampusData, initialData } =
    useReportStore();
  const handleSelectedCampus = () => {
    setSelectedCampusData(title);
  };

  return (
    <Card
      className={`flex  border-solid border-2  cursor-pointer ${
        selectedCampus === title
          ? "bg-[#30E3DF] border-white"
          : "bg-[#15305d] border-gray-200"
      }`}
      onClick={handleSelectedCampus}
    >
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
          <StatCard title={title} status="Graded" data={initialData} />
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default CampusCard;

interface StatCardProps {
  title: string;
  status: string;
  data: Report[];
}

export const StatCard = ({ title, status, data }: StatCardProps) => {
  const campusData = data.filter((item: Report) => item.campus === title);
  const notGraded = campusData.filter(
    (item: Report) => item.grading_status === "Not Graded"
  );
  const graded = campusData.filter(
    (item: Report) => item.grading_status === "Graded"
  );
  return (
    <div className="w-[150px] flex justify-between">
      <span className="text-3xl text-green-500">{graded.length}</span>
      <Separator
        orientation="vertical"
        className="bg-white text-red-500 h-8 w-[2px]"
      />
      <span className="text-3xl text-red-500">{notGraded.length}</span>
    </div>
  );
};

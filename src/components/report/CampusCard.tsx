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

interface StatCardProps {
  title: string;
  campusData: any;
}

function CampusCard({ title, campusData }: StatCardProps) {
  const notGraded = campusData.filter(
    (item: Report) => item.grading_status === "Not Graded"
  );
  const graded = campusData.filter(
    (item: Report) => item.grading_status === "Graded"
  );
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
}

export default CampusCard;

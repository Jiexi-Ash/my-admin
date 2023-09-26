import { Report } from "@/types";
import { create } from "zustand";
import reportData from "@/report.json";

interface ReportStore {
  campusData: Report[];
  selectedCampus: string;
  setSelectedCampusData: (campus: string) => void;
  getSelectedCampusData: (campus: string) => Report[];
}

const useReportStore = create<ReportStore>((set) => ({
  campusData: reportData,
  selectedCampus: "Bedfordview Campus",
  setSelectedCampusData: (campus: string) => {
    const campusData = reportData.filter(
      (item: Report) => item.campus === campus
    );
    set({ campusData, selectedCampus: campus });
  },
  getSelectedCampusData: (campus: string) => {
    const reportData = require("@/report.json");
    const campusData = reportData.filter(
      (item: Report) => item.campus === campus
    );
    return campusData;
  },
}));

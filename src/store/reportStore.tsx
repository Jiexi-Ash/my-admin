import { Report } from "@/types";
import { create } from "zustand";
import reportData from "@/report.json";

interface ReportStore {
  campusData: Report[];
  selectedCampus: string;
  setSelectedCampusData: (campus: string) => void;
  getSelectedCampusData: () => Report[];
}

const useReportStore = create<ReportStore>((set, get) => ({
  campusData: reportData,
  selectedCampus: "Bedfordview Campus",
  setSelectedCampusData: (campus: string) => {
    const campusData = reportData.filter(
      (item: Report) => item.campus === campus
    );
    set({ campusData, selectedCampus: campus });
  },
  getSelectedCampusData: () => {
    const { campusData, selectedCampus } = get();
    return campusData.filter((item: Report) => item.campus === selectedCampus);
  },
}));

export default useReportStore;

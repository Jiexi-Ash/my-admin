import { Report } from "@/types";
import { create } from "zustand";
import reportData from "@/report.json";

interface ReportStore {
  campusData: Report[];
  selectedCampus: string;
  setSelectedCampusData: (campus: string) => void;
  getSelectedCampusData: () => Report[];
  setInitialData: (data: Report[]) => void;
}

const useReportStore = create<ReportStore>((set, get) => ({
  campusData: [],
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

  setInitialData: (data) => {
    set({ campusData: data });
  },
}));

export default useReportStore;

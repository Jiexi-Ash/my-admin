import { Report } from "@/types";
import { create } from "zustand";
import reportData from "@/report.json";

interface ReportStore {
  campusData: Report[];
  selectedCampus: string | null;
  campusNames: string[];
  setSelectedCampusData: (campus: string) => void;
  setCampusNames: (campusNames: string[]) => void;
  getSelectedCampusData: () => Report[];
  setInitialData: (data: Report[]) => void;
}

const useReportStore = create<ReportStore>((set, get) => ({
  campusData: [],
  campusNames: [],
  selectedCampus: null,
  setSelectedCampusData: (campus: string) => {
    const campusData = reportData.filter(
      (item: Report) => item.campus === campus
    );
    set({ campusData, selectedCampus: campus });
  },
  setCampusNames: (campusNames: string[]) => {
    set({ campusNames });
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

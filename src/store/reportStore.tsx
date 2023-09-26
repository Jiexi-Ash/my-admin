import { Report } from "@/types";
import { create } from "zustand";
import reportData from "@/report.json";

interface ReportStore {
  campusData: Report[];
  selectedCampus: string | null;
  campusNames: string[];
  initialData: Report[];
  setSelectedCampusData: (campus: string) => void;
  setCampusNames: (campusNames: string[]) => void;
  getSelectedCampusData: (title: string) => Report[];
  setInitialData: (data: Report[]) => void;
}

const useReportStore = create<ReportStore>((set, get) => ({
  initialData: [],
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
  getSelectedCampusData: (title: string) => {
    const { campusData } = get();
    return campusData.filter((item: Report) => item.campus === title);
  },

  setInitialData: (data) => {
    set({ initialData: data, campusData: data });
  },
}));

export default useReportStore;

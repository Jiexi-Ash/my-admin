"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import useReportStore from "@/store/reportStore";

function FileUpload() {
  const { setInitialData, setCampusNames } = useReportStore();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // read the json file
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const data = JSON.parse(e.target.result as string);
          const campusNamesS = [
            ...new Set(data.map((item) => item.campus)),
          ].filter((item) => item !== "") as string[];
          setCampusNames(campusNamesS);
          setInitialData(data);
        }
      };
      reader.readAsText(e.target.files[0]);
    }
  };
  return (
    <>
      <Button
        variant="outline"
        className="max-w-fit shadow-none rounded-none text-xs"
        onClick={handleClick}
      >
        Choose File
      </Button>
      <input
        accept=".json"
        ref={fileInputRef}
        type="file"
        onChange={handleOnChange}
        className="hidden"
      />
    </>
  );
}

export default FileUpload;

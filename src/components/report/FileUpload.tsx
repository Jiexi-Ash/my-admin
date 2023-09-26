import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function FileUpload() {
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
          const text = e.target.result.toString();
          const json = JSON.parse(text);
          console.log(json);
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
        ref={fileInputRef}
        type="file"
        onChange={handleOnChange}
        className="hidden"
      />
    </>
  );
}

export default FileUpload;

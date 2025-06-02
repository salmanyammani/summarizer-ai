"use client";
import React, { forwardRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean
}
const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit, isLoading }, ref) => {
    return (
      <form ref={ref} onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="flex justify-end items-center gap-1.5">
          <Input
            type="file"
            id="file"
            name="file"
            accept="application/pdf"
            required
            className={cn(isLoading && 'opacity-50 cursor-not-allowed')}
            disabled={isLoading}
          />
          <Button disabled={isLoading}>
            {isLoading ? <>
             <Loader2 className="mr-2 animate-spin"/> Processing...
            </> :  "Upload your PDF"}
            </Button>
        </div>
      </form>
    );
  }
);
UploadFormInput.displayName = "UploadFormInput";
export default UploadFormInput;
// export default function UploadFormInput({onSubmit, ref}: UploadFormInputProps) {
//   return (
//     <form onSubmit={onSubmit} className='flex flex-col gap-6'>
//    <div className="flex justify-end items-center gap-1.5">

//     <Input type="file" id="file" name="file" accept="application/pdf" required
//     className=''/>
//     <Button>Upload your PDF</Button>
//     </div>
//    </form>
//   )
// }

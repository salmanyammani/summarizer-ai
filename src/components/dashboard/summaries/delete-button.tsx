"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { toast } from "sonner";
import { deleteSummaryAction } from "@/actions/summary-actions";

interface DeleteButtonProps {
  summaryId: string;
}

export default function DeleteButton({ summaryId }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteSummaryAction({ summaryId });
      if (!result.success) {
        toast.error("Failed To Delete Summary :(");
      } else {
        toast.success("Summary deleted successfully");
      }
    } catch (error) {
      toast.error("Failed To Delete Summary :(");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size="icon"
          className={
            "text-gray-400 bg-gray-50 border-gray-200 hover:bg-rose-50 hover:text-rose-600"
          }
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] bg-white p-6 shadow-lg rounded-xl animate-dialog-in border border-transparent"
        style={{
          backgroundImage:
            "linear-gradient(white, white), linear-gradient(to right, #374151, #8b5cf6, #ec4899)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <DialogHeader className="animate-fade-in [animation-delay:150ms]">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Delete AI Summary
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Are you sure you want to delete this AI-generated summary?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 animate-fade-in [animation-delay:200ms]">
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-amber-800 text-sm hover:shadow-md hover:bg-amber-100/80 transition-all duration-300 transform hover:scale-[1.02]">
            <p>
              This will permanently remove the AI-generated summary from your
              account
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-3 sm:justify-end animate-fade-in [animation-delay:250ms]">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto hover:bg-gray-100 transition-all duration-300 hover:shadow-sm"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={handleDelete}
              variant="destructive"
              disabled={isDeleting}
              className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse-subtle"
            >
              {isDeleting ? "Deleting..." : "Delete Summary"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

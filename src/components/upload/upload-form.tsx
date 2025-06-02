"use client";
import React, { useRef, useState } from "react";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadThing";
import { toast } from "sonner";
import { CheckCircle, FileText, FileUp, Loader2, Save } from "lucide-react";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRouter } from "next/navigation";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
      toast.error("Error occurred while uploading");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      // Validate file
      const validateFields = schema.safeParse({ file });
      if (!validateFields.success) {
        toast("Something Went Wrong Please Try Again");
        setIsLoading(false);
        return;
      }

      // Start file upload
      toast("Uploading PDF...", {
        icon: <FileUp className="h-5 w-5 text-blue-500" />,
        className: "border-l-4 border-l-blue-500",
      });

      const resp = await startUpload([file]);
      if (!resp) {
        toast("Something Went Wrong Please Use a Different File");
        setIsLoading(false);
        return;
      }

      // Start processing
      toast("File uploaded, processing with AI...", {
        icon: <Loader2 className="h-5 w-5 text-amber-500 animate-spin" />,
        className: "border-l-4 border-l-amber-500",
      });

      const result = await generatePdfSummary([
        {
          serverData: {
            userId: resp[0].serverData.userId,
            file: {
              ufsUrl: resp[0].serverData.file.ufsUrl,
              name: resp[0].serverData.file.name,
            },
          },
        },
      ]);

      if (!result?.success || !result.data) {
        toast.error(result?.message || "Failed to process PDF", {
          className: "border-l-4 border-l-red-500 bg-red-500/90 text-white",
        });
        setIsLoading(false);
        formRef.current?.reset();
        return;
      }

      // Start saving
      toast("Saving your PDF...", {
        icon: <Save className="h-5 w-5 text-blue-500" />,
        className: "border-l-4 border-l-blue-500",
      });

      const storeResult = await storePdfSummaryAction({
        summary: result.data.summary,
        fileUrl: resp[0].serverData.file.url,
        title: result.data.title,
        fileName: file.name,
      });

      toast.success("PDF saved successfully!", {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });

      formRef.current?.reset();
      if (storeResult?.data?.id) {
        router.push(`/summaries/${storeResult.data.id}`);
      } else {
        router.push("/summaries");
      }
    } catch (error) {
      console.error("error occurred", error);
      setIsLoading(false);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UploadFormInput
      isLoading={isLoading}
      ref={formRef}
      onSubmit={handleSubmit}
    />
  );
}

// const schema = z.object({
//   file: z
//     .instanceof(File, { message: "Invalid File" })
//     .refine(
//       (file) => file.size <= 20 * 1024 * 1024,
//       "File size must be less than 20MB"
//     )
//     .refine(
//       (file) => file.type.startsWith("application/pdf"),
//       "File must be a PDF"
//     ),
// });

// export default function UploadForm() {
//   const formRef = useRef<HTMLFormElement>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter()
//   const simulateUpload = () => {
//     const uploadToastId = toast("Uploading PDF", {
//       description: "document.pdf (10%)",
//       icon: <FileUp className="h-5 w-5 text-blue-500" />,
//       position: "top-right",
//       className: "border-l-4 border-l-blue-500",
//     });

//     // Update to 40%
//     setTimeout(() => {
//       toast("Uploading PDF", {
//         id: uploadToastId,
//         description: "document.pdf (30%)",
//         icon: <FileUp className="h-5 w-5 text-blue-500" />,
//         position: "top-right",
//         className: "border-l-4 border-l-blue-500",
//       });
//     }, 600);
//     setTimeout(() => {
//       toast("Uploading PDF", {
//         id: uploadToastId,
//         description: "document.pdf (70%)",
//         icon: <FileUp className="h-5 w-5 text-blue-500" />,
//         position: "top-right",
//         className: "border-l-4 border-l-blue-500",
//       });
//     }, 400);

//     // Complete notification
//     setTimeout(() => {
//       toast.success("Upload Complete", {
//         description: "document.pdf has been uploaded",
//         icon: <CheckCircle className="h-5 w-5 text-green-500" />,
//         position: "top-right",
//       });
//     }, 1200);
//   };
//   const simulateProcessing = () => {
//     // Initial processing notification
//     const processToastId = toast("Processing PDF", {
//       description: "Analyzing document... (10%)",
//       icon: <Loader2 className="h-5 w-5 text-amber-500 animate-spin" />,
//       position: "top-right",
//       className: "border-l-4 border-l-amber-500",
//     });

//     // Update to 40%
//     setTimeout(() => {
//       toast("Processing PDF", {
//         id: processToastId,
//         description: "Analyzing document... (40%)",
//         icon: <Loader2 className="h-5 w-5 text-amber-500 animate-spin" />,
//         position: "top-right",
//         className: "border-l-4 border-l-amber-500",
//       });
//     }, 800);

//     // Complete notification
//     setTimeout(() => {
//       toast.success("Processing Complete", {
//         description: "Your PDF is ready to view",
//         icon: <FileText className="h-5 w-5 text-green-500" />,
//         position: "top-right",
//       });
//     }, 1600);
//   };

//   const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
//     onClientUploadComplete: () => {
//       console.log("uploaded successfully!");
//     },
//     onUploadError: (err) => {
//       console.error("error occurred while uploading", err);
//       toast.error("error occurred while uploading");
//     },
//     onUploadBegin: ({ file }: any) => {
//       console.log("upload has begun for", file);
//     },
//   });
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       setIsLoading(true);
//       const formData = new FormData(e.currentTarget);
//       const file = formData.get("file") as File;

//       //validate
//       const validateFields = schema.safeParse({ file });
//       if (!validateFields.success) {
//         // console.log(
//         //   validateFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
//         // );
//         toast("Something Went Wrong Please Try Again");
//         setIsLoading(false)
//         return;
//       }
//       //schema with zod
//       //upload fi

//       simulateUpload();
//       const resp = await startUpload([file]);
//       if (!resp) {
//         console.log("Good So Far If This Shows");
//         toast("Something Went Wrong Please Use a Different File");
//         setIsLoading(false)
//         return;
//       }
//       const result = await generatePdfSummary([
//         {
//           serverData: {
//             userId: resp[0].serverData.userId,
//             file: {
//               ufsUrl: resp[0].serverData.file.ufsUrl,
//               name: resp[0].serverData.file.name,
//             },
//           },
//         },
//       ]);

//       if (!result) {
//         toast("Error 302 Failed to process PDF");
//         return;
//       }

//       if (result.success && result.data) {
//         console.log("PDF Text:", result.data, { result });
//         toast("PDF processed successfully!");
//       } else {
//         toast(result.message || "Failed to process PDF");
//       }
//       const { data = null, message = null } = result || {};
//       if (data) {
//         let storeResult: any;
//         toast("Saving PDF...");
//         if(data.pdfText){
//           storeResult =  await storePdfSummaryAction({
//             summary: data.pdfText,
//             fileUrl: resp[0].serverData.file.url,
//             title: data.title,
//             fileName: file.name
//           })
//           toast("PDF Generate and Saved Successfully!")
//           formRef.current?.reset();
//           router.push(`/summaries/${storeResult.data.id}`)
//         }
//       }
//     } catch (error) {
//       console.error("error occurred", error);
//       setIsLoading(false)
//       formRef.current?.reset();
//     } finally {
//       setIsLoading(false)
//     }
//   };
//   return <UploadFormInput isLoading={isLoading}  ref={formRef} onSubmit={handleSubmit} />;
// }

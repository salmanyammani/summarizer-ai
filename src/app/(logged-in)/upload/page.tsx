import UploadForm from "@/components/upload/upload-form";
import UploadHeader from "@/components/upload/upload-header";
import React from "react";

export default function Page() {
  return (
    <section className="min-h-screen w-full relative overflow-x-hidden">
      <div className="absolute top-8 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute top-1/2 -right-32 h-64 w-64 rounded-full bg-pink-300/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-5 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </section>
  );
}

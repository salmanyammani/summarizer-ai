import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EmptySummariesUI from "@/components/dashboard/summaries/empty-summaries";
import SummaryCard from "@/components/dashboard/summaries/summary-card";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardPage() {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return redirect("/sign-in");
  }
  const uploadLimit = 5;
  const summaries = await getSummaries(userId);
  return (
    <main className=" lg:max-w-7xl mx-auto lg:px-5 min-h-screen overflow-x-hidden">
      <div className="absolute top-14 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
      {/* <div className="absolute top-1/2 -right-32 h-64 w-64 rounded-full bg-pink-300/20 blur-3xl" /> */}
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />
      <div className="absolute -bottom-36 right-4 h-80 w-80 rounded-full bg-gradient-to-r from-purple-200/60 to-pink-400/20 blur-3xl" />
      <div className="flex w-full justify-between items-end">
        <DashboardHeader />
        <Link href={"/upload"}>
          <ButtonColorful className="mt-32" label="New Summary" />
        </Link>
      </div>
      <div className="my-6">
        <div className="bg-rose-50 border-rose-200 border rounded-lg p-4 text-rose-800">
          <p className="text-sm">
            You've reached the limit of {uploadLimit} uploads on the basic plan.{" "}
            {""}
            <Link
              href={"/#pricing"}
              className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center"
            >
              Click here to upgade to pro{" "}
              <ArrowRight className="h-4 w-4 inline-block" />
            </Link>{" "}
            {""} for unlimited uploads.
          </p>
        </div>
      </div>
      {summaries.length === 0 ? (
        <EmptySummariesUI />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
          {summaries.map((summary, index) => (
            <SummaryCard key={index} summary={summary} />
          ))}
        </div>
      )}
    </main>
  );
}

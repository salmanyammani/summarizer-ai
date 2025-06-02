import SourceInfo from "@/components/dashboard/summaries/source-info";
import { SummaryViewer } from "@/components/dashboard/summaries/summary-viewer";
import SummaryHeader from "@/components/dashboard/summaries/summary_header";
import getSummaryById from "@/lib/summaries";
import { notFound } from "next/navigation";

export default async function SummaryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const summary = await getSummaryById(id);
  if (!summary) {
    return notFound();
  }
  const { title, summary_text, file_name, word_count, created_at, original_file_url } = summary;
  const reading_time = Math.ceil((word_count || 0)/200)
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden">
      <div className="absolute top-8 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute top-1/2 -right-32 h-64 w-64 rounded-full bg-pink-300/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <div className="flex flex-col">
            <SummaryHeader title={title} createdAt={created_at} readingTime={reading_time}/>
          </div>

          {file_name && <SourceInfo fileName={file_name} fileUrl={original_file_url} title={title} summaryText={summary_text} createdAt={created_at} />}

          <div className="relative mt-4 sm:mt-8 lg:mt-10">
            <div className="relative p-4 sm:p-6 lg:p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-rose-100/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-[750px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl" />
              <SummaryViewer summary={summary_text}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { NavigationControls } from "./navigation-controls";
import ProgressBar from "./progress-bar";
import { parseSection } from "@/utils/summary-helpers";
import ContentSection from "./content-section";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
      <h2 className="text-3xl lg:text-4xl font-bold text-center flex items-center justify-center gap-2">
        {title}
      </h2>
    </div>
  );
};

export function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState(0);
  const handleNext = () =>
    setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
  const handlePrevious = () =>
    setCurrentSection((prev) => Math.max(prev - 1, 0));

  // Parse the summary into sections
  // const sections = summary
  //   .split(/\n##\s/) // Split on markdown headers
  //   .map((section) => section.trim())
  //   .filter(Boolean)
  //   .map((section) => {
  //     console.log("=== Processing Section ===");
  //     console.log(section);
  //     console.log("=== End Section ===");

  //     // If section doesn't start with #, add it back
  //     if (!section.startsWith("#")) {
  //       section = "# " + section;
  //     }

  //     // Split into lines and process
  //     const lines = section.split("\n");
  //     const title = lines[0].replace(/^#+\s*/, "").trim();

  //     // Process points, handling both bullet points and nested points
  //     const points = lines
  //       .slice(1)
  //       .map((line) => line.trim())
  //       .filter(
  //         (line) => line && (line.startsWith("-") || line.startsWith("*"))
  //       )
  //       .map((line) => {
  //         // Convert * to - for consistency
  //         if (line.startsWith("*")) {
  //           line = "-" + line.slice(1);
  //         }
  //         return line;
  //       });

  //     console.log("Extracted title:", title);
  //     console.log("Extracted points:", points);

  //     return { title, points };
  //   });
  const rawSections = summary
    .split(/(?=^##\s)/m)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.startsWith("##") ? s : `## ${s}`));

  // Delegate to your helper for clean parsing
  // 2. Parse each chunk into { title, points }
  const sections = rawSections.map((section) => parseSection(section));

  // 3. Detect if first is a "cover" (no bullets)
  const hasCover = sections.length > 0 && sections[0].points.length === 0;
  const coverSection = hasCover ? sections[0] : null;
  const contentSections = hasCover ? sections.slice(1) : sections;

  // 4. Total slides = optional cover + content
  const totalSlides = (hasCover ? 1 : 0) + contentSections.length;

  // 5. Map currentSection → actual data
  const isCoverSlide = hasCover && currentSection === 0;
  const contentIndex = hasCover ? currentSection - 1 : currentSection;
  const displaySection = isCoverSlide
    ? coverSection!
    : contentSections[contentIndex]; // always in-bounds now
  return (
    <Card
      className={`relative px-2
        h-[500px] sm:h-[600px] ${
          isCoverSlide ? "lg:h-[540px]" : "lg:h-[660px] "
        } 
        w-full xl:w-full
        overflow-hidden
        bg-gradient-to-br from-background via-background/95
        to-rose-500/5
        backdrop-blur-lg shadow-2xl rounded-3xl
        border border-rose-500/10`}
    >
      <ProgressBar
        sections={contentSections}
        currentSection={hasCover ? contentIndex : currentSection}
      />

      <div className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24">
        <div className="px-4 sm:px-6 h-full">
          {isCoverSlide ? (
            // COVER slide styling
            <div className="flex items-center justify-center h-full px-2">
              <h1 className="text-5xl lg:text-6xl font-black text-center">
                {displaySection.title}
              </h1>
            </div>
          ) : (
            // REGULAR content slide
            <>
              <SectionTitle title={displaySection.title} />
              <ContentSection
                title={displaySection.title}
                points={displaySection.points}
              />
            </>
          )}
        </div>
      </div>

      <NavigationControls
        currentSection={currentSection}
        totalSections={totalSlides}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSectionSelect={setCurrentSection}
      />
    </Card>
  );
}

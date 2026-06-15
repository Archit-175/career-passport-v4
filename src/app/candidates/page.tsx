import { CandidateHero } from "@/components/candidates/CandidateHero";
import { TheProblem } from "@/components/candidates/TheProblem";
import { Bridge } from "@/components/candidates/Bridge";
import { HowVisibilityWorks } from "@/components/candidates/HowVisibilityWorks";
import { YourPassportMeasured } from "@/components/candidates/YourPassportMeasured";
import { OpportunitiesSection } from "@/components/candidates/OpportunitiesSection";
import { CandidateCta } from "@/components/candidates/CandidateCta";

export default function CandidatesPage() {
  return (
    <div
      style={{
        height: "100dvh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
    >
      <div style={{ scrollSnapAlign: "start", minHeight: "100dvh" }}>
        <CandidateHero />
      </div>
      <div style={{ scrollSnapAlign: "start", minHeight: "100dvh" }}>
        <TheProblem />
      </div>
      <div style={{ scrollSnapAlign: "start", minHeight: "100dvh" }}>
        <Bridge />
      </div>
      <div style={{ scrollSnapAlign: "start", minHeight: "100dvh" }}>
        <HowVisibilityWorks />
      </div>
      <div style={{ scrollSnapAlign: "start", minHeight: "100dvh" }}>
        <YourPassportMeasured />
      </div>
      <div style={{ scrollSnapAlign: "start", minHeight: "100dvh" }}>
        <OpportunitiesSection />
      </div>
      <div style={{ scrollSnapAlign: "start", minHeight: "100dvh" }}>
        <CandidateCta />
      </div>
    </div>
  );
}

import { CandidateHero } from "@/components/candidates/CandidateHero";
import { TheProblem } from "@/components/candidates/TheProblem";
import { Bridge } from "@/components/candidates/Bridge";
import { HowVisibilityWorks } from "@/components/candidates/HowVisibilityWorks";
import { YourPassportMeasured } from "@/components/candidates/YourPassportMeasured";
import { OpportunitiesSection } from "@/components/candidates/OpportunitiesSection";
import { CandidateCta } from "@/components/candidates/CandidateCta";
import { SmoothSnapScroller } from "@/components/SmoothSnapScroller";

export default function CandidatesPage() {
  return (
    <SmoothSnapScroller>
      <div data-snap style={{ minHeight: "100dvh" }}>
        <CandidateHero />
      </div>
      <div data-snap style={{ minHeight: "100dvh" }}>
        <TheProblem />
      </div>
      <div data-snap style={{ minHeight: "100dvh" }}>
        <Bridge />
      </div>
      <div data-snap style={{ minHeight: "100dvh" }}>
        <HowVisibilityWorks />
      </div>
      <div data-snap style={{ minHeight: "100dvh" }}>
        <YourPassportMeasured />
      </div>
      <div data-snap style={{ minHeight: "100dvh" }}>
        <OpportunitiesSection />
      </div>
      <div data-snap style={{ minHeight: "100dvh" }}>
        <CandidateCta />
      </div>
    </SmoothSnapScroller>
  );
}

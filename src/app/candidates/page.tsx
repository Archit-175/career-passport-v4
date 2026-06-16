import { CandidateHero } from "@/components/candidates/CandidateHero";
import { TheProblem } from "@/components/candidates/TheProblem";
import { Bridge } from "@/components/candidates/Bridge";
import { HowVisibilityWorks } from "@/components/candidates/HowVisibilityWorks";
import { YourPassportMeasured } from "@/components/candidates/YourPassportMeasured";
import { CandidateCta } from "@/components/candidates/CandidateCta";

export default function CandidatesPage() {
  return (
    <main>
      <div style={{ minHeight: "100dvh" }}>
        <CandidateHero />
      </div>
      <div>
        <TheProblem />
      </div>
      <div>
        <Bridge />
      </div>
      <div>
        <HowVisibilityWorks />
      </div>
      <div>
        <YourPassportMeasured />
      </div>
      <div style={{ minHeight: "100dvh" }}>
        <CandidateCta />
      </div>
    </main>
  );
}

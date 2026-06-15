import { CompanyHero } from "@/components/companies/CompanyHero";
import { CompanyHowItWorks } from "@/components/companies/CompanyHowItWorks";
import { CompanyWhatHappensInBackend } from "@/components/companies/CompanyWhatHappensInBackend";
import { CompanyCta } from "@/components/companies/CompanyCta";
import { SnapHtml } from "./SnapHtml";

const snapSection: React.CSSProperties = {
  scrollSnapAlign: "start",
  minHeight: "100dvh",
};

export default function CompaniesPage() {
  return (
    <>
      <SnapHtml />
      <div style={snapSection}>
        <CompanyHero />
      </div>
      <div style={{ scrollSnapAlign: "start" }}>
        <CompanyHowItWorks />
      </div>
      <div style={snapSection}>
        <CompanyWhatHappensInBackend />
      </div>
      <div style={snapSection}>
        <CompanyCta />
      </div>
    </>
  );
}

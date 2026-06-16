import { CompanyHero } from "@/components/companies/CompanyHero";
import { CompanyHowItWorks } from "@/components/companies/CompanyHowItWorks";
import { CompanyWhatHappensInBackend } from "@/components/companies/CompanyWhatHappensInBackend";
import { CompanyCta } from "@/components/companies/CompanyCta";

const fullSection: React.CSSProperties = {
  minHeight: "100dvh",
};

export default function CompaniesPage() {
  return (
    <>
      <div style={fullSection}>
        <CompanyHero />
      </div>
      <div>
        <CompanyHowItWorks />
      </div>
      <div>
        <CompanyWhatHappensInBackend />
      </div>
      <div style={fullSection}>
        <CompanyCta />
      </div>
    </>
  );
}

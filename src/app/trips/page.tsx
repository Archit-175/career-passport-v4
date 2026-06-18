import type { Metadata } from "next";
import { TripsPage } from "@/components/trips/TripsPage";

export const metadata: Metadata = {
  title: "Trips — Career Passport",
  description:
    "A Trip is a guided session that captures how you actually think and work — turning real experience into verifiable proof.",
};

export default function Page() {
  return <TripsPage />;
}

import { BridgeV2 } from "@/components/candidates/BridgeV2";

// Isolated preview route for the redesigned Bridge section.
// Safe to delete this folder + BridgeV2.tsx to remove entirely.
export default function BridgeSandboxPage() {
  return (
    <main className="bg-ink min-h-screen flex items-center">
      <div className="w-full">
        <BridgeV2 />
      </div>
    </main>
  );
}

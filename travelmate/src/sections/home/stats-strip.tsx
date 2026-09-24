import { TrustBar } from "@/components/shared/trust-bar";

export function StatsStrip() {
  return (
    <div className="relative z-10 -mt-12 sm:-mt-14">
      <div className="container-page">
        <TrustBar />
      </div>
    </div>
  );
}

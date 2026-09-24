import { Award, Headset, ShieldCheck, Wallet } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const years = new Date().getFullYear() - siteConfig.foundedYear;

const items = [
  { icon: Award, title: `Since ${siteConfig.foundedYear}`, text: `${years}+ years of trusted travel` },
  { icon: ShieldCheck, title: "Hajj, Umrah & tours", text: "Everything under one roof" },
  { icon: Wallet, title: "Transparent pricing", text: "No hidden charges" },
  { icon: Headset, title: "Real people", text: "Named experts for every desk" },
];

export function TrustBar() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-soft lg:grid-cols-4">
      {items.map(({ icon: I, title, text }) => (
        <div key={title} className="flex items-center gap-3 bg-white p-4 sm:p-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <I className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-bold text-ink">{title}</p>
            <p className="text-xs text-muted-foreground sm:text-[13px]">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

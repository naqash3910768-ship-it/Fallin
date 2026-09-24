import {
  Award,
  Briefcase,
  Compass,
  Globe,
  Headset,
  Heart,
  Hotel,
  Landmark,
  Moon,
  Mountain,
  Plane,
  ShieldCheck,
  Ship,
  Stamp,
  Users,
  Wallet,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/types";

const icons: Record<IconName, React.ComponentType<LucideProps>> = {
  plane: Plane,
  mountain: Mountain,
  heart: Heart,
  users: Users,
  ship: Ship,
  briefcase: Briefcase,
  globe: Globe,
  stamp: Stamp,
  hotel: Hotel,
  moon: Moon,
  landmark: Landmark,
  compass: Compass,
  shield: ShieldCheck,
  headset: Headset,
  wallet: Wallet,
  award: Award,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = icons[name];
  return <Cmp aria-hidden {...props} />;
}

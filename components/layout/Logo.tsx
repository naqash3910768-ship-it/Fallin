import Image from "next/image";

export function Logo({ className = "h-9" }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt="Fello Moulded Furniture"
      width={1088}
      height={677}
      priority
      className={`w-auto ${className}`}
    />
  );
}

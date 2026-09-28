import { cn } from "@/lib/utils";

const SRC = {
  wordmark: "/wordmark-3d.png",
  lockup: "/wordmark-3d.png",
  original: "/wordmark-3d.png",
} as const;

export function BrandLogo({
  className,
  alt = "fleshsesh",
  variant = "wordmark",
}: {
  className?: string;
  alt?: string;
  variant?: keyof typeof SRC;
}) {
  return (
    <img
      src={SRC[variant]}
      alt={alt}
      className={cn("pointer-events-none select-none object-contain", className)}
    />
  );
}

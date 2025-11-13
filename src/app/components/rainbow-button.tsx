"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const rainbowButtonVariants = cva(
  cn(
    "relative cursor-pointer group transition-all duration-300 animate-rainbow",
    "inline-flex items-center justify-center gap-2 shrink-0",
    "rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "text-sm font-medium whitespace-nowrap select-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0"
  ),
  {
    variants: {
      variant: {
        default: cn(
          // ✅ Background uses var(--text), text uses var(--background)
          "border-0 text-[color:var(--background)] bg-[color:var(--text)]",
          // Animated gradient border and soft glow
          "relative border border-transparent bg-[linear-gradient(var(--text),var(--text)),var(--gradient-primary)] bg-[length:200%] [background-clip:padding-box,border-box] [background-origin:border-box]",
          "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2",
          "before:animate-rainbow before:bg-[var(--gradient-primary)] before:[filter:blur(1.25rem)_brightness(1.5)] before:opacity-80 before:mix-blend-screen",

          "shadow-lg hover:brightness-110 active:scale-[0.98] transition-all duration-300"
        ),

        outline: cn(
          // ✅ Outline version also inverted
          "border border-[color:var(--text)]/30 text-[color:var(--text)] bg-[color:var(--background)]",
          "bg-[linear-gradient(var(--background),var(--background)),var(--gradient-accent-soft)] bg-[length:200%]",
          "[background-clip:padding-box,border-box] [background-origin:border-box]",
          "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2",
          "before:animate-rainbow before:bg-[var(--gradient-accent-hard)] before:[filter:blur(0.75rem)]",
          "hover:text-[color:var(--background)] hover:bg-[color:var(--text)] hover:shadow-xl transition-all duration-300"
        ),
      },

      size: {
        default: "h-10 px-6",
        sm: "h-8 rounded-xl px-3 text-xs",
        lg: "h-12 rounded-2xl px-8 text-base",
        icon: "size-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof rainbowButtonVariants> {
  asChild?: boolean;
}

const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(rainbowButtonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

RainbowButton.displayName = "RainbowButton";

export { RainbowButton, rainbowButtonVariants };

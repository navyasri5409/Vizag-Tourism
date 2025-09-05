"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-secondary/20 text-secondary-foreground hover:bg-secondary/30",
        primary: "bg-primary/10 text-primary hover:bg-primary/20",
        accent: "bg-accent/10 text-accent-foreground hover:bg-accent/20",
      },
      size: {
        default: "h-8 px-4 py-2",
        sm: "h-7 rounded-full px-3",
        lg: "h-9 rounded-full px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {}

function Chip({ className, variant, size, ...props }: ChipProps) {
  return (
    <div
      className={cn(chipVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Chip, chipVariants };

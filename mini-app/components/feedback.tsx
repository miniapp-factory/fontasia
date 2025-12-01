"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

export interface FeedbackProps {
  message: string;
  visible: boolean;
}

export default function Feedback({ message, visible }: FeedbackProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      // nothing
    }, 2000);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg",
        "transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      {message}
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils"; // Assuming a standard Shadcn-like cn utility exists or I'll provide a fallback

export default function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-slate-200/60", className)}
            {...props}
        />
    );
}

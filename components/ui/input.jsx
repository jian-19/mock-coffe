// No seu arquivo: seu-projeto/components/ui/input.jsx

"use client"; // Necessário se você estiver usando Next.js App Router

import * as React from "react";
import { cn } from "@/lib/utils"; // Certifique-se que o caminho está correto

// Não há "interface" em JavaScript, então definimos as props diretamente
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
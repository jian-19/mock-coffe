// No seu arquivo: seu-projeto/components/ui/label.jsx

"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority"; // Agora sem 'type VariantProps'

import { cn } from "@/lib/utils"; // Certifique-se que o caminho está correto

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

// REMOVIDO: O bloco "interface LabelProps" inteiro foi removido.
// O componente 'Label' agora aceitará as props diretamente, sem tipagem explícita em JS.
const Label = React.forwardRef(
  ({ className, ...props }, ref) => ( // Removida a tipagem <React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  )
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
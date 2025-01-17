"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import Link from "next/link"  // Se estiver usando Next.js, ou você pode importar de outro lugar

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const LabelForgotPass = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & 
    VariantProps<typeof labelVariants> & {
      showRecoveryLink?: boolean;  // Para mostrar o link de recuperação
      onRecoveryLinkClick?: () => void;  // Função de click do link
    }
>(({ className, showRecoveryLink, onRecoveryLinkClick, children, ...props }, ref) => (
  <div className="flex mt-4 items-center">
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    >
      {children}
    </LabelPrimitive.Root>    
      <Link
        href="#"
        onClick={onRecoveryLinkClick}
        className="ml-auto inline-block text-sm underline"
      >
        Esqueceu a senha?
      </Link>
  </div>
))

LabelForgotPass.displayName = LabelPrimitive.Root.displayName

export { LabelForgotPass }

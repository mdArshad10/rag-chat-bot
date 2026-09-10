import type { ReactNode } from "react"
import { Button as ShadcnButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ButtonVariant = "primary" | "secondary" | "ghost"

export type ButtonProps = {
  children: ReactNode
  variant?: ButtonVariant
  onClick?: () => void
  icon?: ReactNode
  type?: "button" | "submit"
  className?: string
}

export function Button({
  children,
  variant = "primary",
  onClick,
  icon,
  type = "button",
  className,
}: ButtonProps) {
  return (
    <ShadcnButton
      type={type}
      variant={variant === "primary" ? "default" : variant}
      className={cn("button", `button-${variant}`, className)}
      onClick={onClick}
    >
      {icon}
      {children}
    </ShadcnButton>
  )
}


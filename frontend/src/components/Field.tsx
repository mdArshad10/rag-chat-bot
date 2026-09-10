import type { ReactNode } from "react"
import { Field as ShadcnField, FieldLabel } from "@/components/ui/field"

export function Field({
  label,
  hint,
  invalid = false,
  children,
}: {
  label: string
  hint?: string
  invalid?: boolean
  children: ReactNode
}) {
  return (
    <ShadcnField className="field" data-invalid={invalid || undefined}>
      <FieldLabel className="field-label">
        {label}
        {hint && <small>{hint}</small>}
      </FieldLabel>
      {children}
    </ShadcnField>
  )
}

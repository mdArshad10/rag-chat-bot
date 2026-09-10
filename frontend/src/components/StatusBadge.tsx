import { Badge } from "@/components/ui/badge"

export type Status = "live" | "draft" | "paused" | "ready" | "indexing"

export function StatusBadge({ status }: { status: Status }) {
  const label =
    status === "ready"
      ? "Ready"
      : status === "indexing"
        ? "Indexing"
        : status[0].toUpperCase() + status.slice(1)
  return (
    <Badge variant="outline" className={`status-badge status-${status}`}>
      <span />
      {label}
    </Badge>
  )
}


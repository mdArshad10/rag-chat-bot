import { ChevronRight, CircleHelp } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { pageLabels, type Page } from "../types"

export function Topbar({
  page,
  onAuth,
}: {
  page: Page
  onAuth: () => void
}) {
  return (
    <header className="topbar">
      <div className="breadcrumb-wrap">
        <SidebarTrigger
          className="mobile-menu icon-button"
          aria-label="Open navigation"
        />
        <span className="crumb-muted">Workspace</span>
        <ChevronRight size={14} />
        <span>{pageLabels[page as Exclude<Page, "auth">]}</span>
      </div>
      <div className="topbar-actions">
        <span className="status-ping">
          <span /> All systems operational
        </span>
        <button className="topbar-icon icon-button" aria-label="Help">
          <CircleHelp size={16} />
        </button>
        <button
          className="avatar avatar-button"
          onClick={onAuth}
          aria-label="Open account"
        >
          JD
        </button>
      </div>
    </header>
  )
}


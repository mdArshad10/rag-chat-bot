import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  MoreHorizontal,
  Settings2,
} from "lucide-react"
import { BrandMark } from "@/components/BrandMark"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/shared/store/app-store"
import { navItems, type Page } from "../types"

export function Sidebar({
  activePage,
  onNavigate,
}: {
  activePage: Exclude<Page, "auth">
  onNavigate: (page: Page) => void
}) {
  const workspace = useAppStore((state) => state.workspace)
  const { setOpenMobile } = useSidebar()
  const handleNavigate = (page: Page) => {
    onNavigate(page)
    setOpenMobile(false)
  }
  return (
    <ShadcnSidebar className="sidebar" collapsible="offcanvas">
      <SidebarHeader className="sidebar-top">
        <BrandMark />
      </SidebarHeader>
      <SidebarContent>
        <div className="workspace-switcher">
          <div className="workspace-avatar">{workspace.name.slice(0, 1)}</div>
          <div className="workspace-copy">
            <strong>{workspace.name}</strong>
            <span>Workspace</span>
          </div>
          <ChevronDown size={14} className="muted-icon" />
        </div>
        <SidebarGroup className="sidebar-nav-group">
          <SidebarGroupLabel className="nav-section-label">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="primary-nav">
              {navItems.map(({ id, label, icon: Icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton
                    className={cn("nav-item", activePage === id && "active")}
                    isActive={activePage === id}
                    onClick={() => handleNavigate(id)}
                  >
                    <Icon size={16} strokeWidth={1.8} />
                    <span>{label}</span>
                    {id === "knowledge" && <span className="nav-count">3</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="sidebar-spacer" />
      </SidebarContent>
      <SidebarFooter className="sidebar-bottom">
        <div className="setup-card">
          <div className="setup-card-top">
            <span className="eyebrow">GETTING STARTED</span>
            <span className="setup-percent">62%</span>
          </div>
          <div className="setup-track">
            <span />
          </div>
          <p>Finish setting up your agent</p>
          <button
            onClick={() => handleNavigate("builder")}
            className="setup-link"
          >
            View checklist <ChevronRight size={13} />
          </button>
        </div>
        <button className="nav-item">
          <CircleHelp size={16} />
          <span>Help center</span>
          <ArrowUpRight size={13} className="external-icon" />
        </button>
        <button className="nav-item">
          <Settings2 size={16} />
          <span>Settings</span>
        </button>
        <Separator className="sidebar-separator" />
        <button className="profile-row" onClick={() => handleNavigate("auth")}>
          <span className="avatar avatar-small">JD</span>
          <span className="profile-copy">
            <strong>Jordan Davis</strong>
            <span>Owner</span>
          </span>
          <MoreHorizontal size={15} className="muted-icon" />
        </button>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}


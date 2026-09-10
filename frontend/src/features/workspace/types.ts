import {
  BookOpen,
  Code2,
  LayoutDashboard,
  MessageSquareText,
  Settings2,
  type LucideIcon,
} from "lucide-react"

export type Page =
  | "dashboard"
  | "builder"
  | "knowledge"
  | "playground"
  | "deploy"
  | "auth"

export const pageLabels: Record<Exclude<Page, "auth">, string> = {
  dashboard: "Overview",
  builder: "Agent builder",
  knowledge: "Knowledge base",
  playground: "Playground",
  deploy: "Deploy & SDK",
}

export type NavItem = {
  id: Exclude<Page, "auth">
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "builder", label: "Agent builder", icon: Settings2 },
  { id: "knowledge", label: "Knowledge base", icon: BookOpen },
  { id: "playground", label: "Playground", icon: MessageSquareText },
  { id: "deploy", label: "Deploy & SDK", icon: Code2 },
]

export type AppProps = {
  initialPage?: Page
  onNavigate?: (page: Page) => void
}


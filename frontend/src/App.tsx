import { useState, type CSSProperties } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AuthScreen } from "@/features/auth/components/AuthScreen"
import { Dashboard } from "@/features/dashboard/components/Dashboard"
import { AgentBuilder } from "@/features/agents/components/AgentBuilder"
import { KnowledgeBase } from "@/features/knowledge/components/KnowledgeBase"
import { Playground } from "@/features/playground/components/Playground"
import { Deploy } from "@/features/deploy/components/Deploy"
import { Sidebar } from "@/features/workspace/components/Sidebar"
import { Topbar } from "@/features/workspace/components/Topbar"
import type { Page, AppProps } from "@/features/workspace/types"

export type { Page, AppProps }
export { AuthScreen }

export function App({ initialPage = "dashboard", onNavigate }: AppProps) {
  const [localPage, setLocalPage] = useState<Page>(initialPage)
  const page = onNavigate ? initialPage : localPage
  const navigate = (next: Page) => {
    onNavigate?.(next)
    if (!onNavigate) setLocalPage(next)
  }

  if (page === "auth") {
    return (
      <AuthScreen
        onBack={() => navigate("dashboard")}
        onSuccess={() => navigate("dashboard")}
      />
    )
  }

  return (
    <SidebarProvider
      className="app-frame"
      style={{ "--sidebar-width": "236px" } as CSSProperties}
    >
      <Sidebar activePage={page} onNavigate={navigate} />
      <main className="app-main">
        <Topbar page={page} onAuth={() => navigate("auth")} />
        <div className="page-scroll">
          {page === "dashboard" && <Dashboard onNavigate={navigate} />}
          {page === "builder" && <AgentBuilder onNavigate={navigate} />}
          {page === "knowledge" && <KnowledgeBase />}
          {page === "playground" && <Playground />}
          {page === "deploy" && <Deploy />}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default App

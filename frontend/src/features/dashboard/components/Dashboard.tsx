import type { ReactNode } from "react"
import {
  ArrowUpRight,
  Bot,
  Check,
  ChevronRight,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Upload,
  Zap,
} from "lucide-react"
import { Button } from "@/components/Button"
import { PageHeader } from "@/components/PageHeader"
import { StatusBadge } from "@/components/StatusBadge"
import type { Page } from "@/features/workspace/types"

export function Dashboard({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const agents = [
    {
      name: "Northstar support",
      type: "Support agent",
      status: "live" as const,
      edited: "Today, 10:42 AM",
      tests: "128",
    },
    {
      name: "Inbound qualifier",
      type: "Lead qualification",
      status: "draft" as const,
      edited: "Yesterday",
      tests: "42",
    },
    {
      name: "Renewal concierge",
      type: "Sales agent",
      status: "paused" as const,
      edited: "Aug 28, 2026",
      tests: "19",
    },
  ]
  return (
    <div className="content-container dashboard-page">
      <PageHeader
        eyebrow="OVERVIEW"
        title="Good morning, Jordan"
        description="Build, test, and ship agents that do the work for you."
        actions={
          <Button
            onClick={() => onNavigate("builder")}
            icon={<Plus size={16} />}
          >
            New agent
          </Button>
        }
      />
      <div className="dashboard-grid">
        <section className="card hero-card">
          <div className="hero-card-main">
            <div className="hero-kicker">
              <span className="signal-dot pulse" /> YOUR AGENT IS LIVE
            </div>
            <h2>
              Northstar support
              <br />
              <em>is handling the queue.</em>
            </h2>
            <p>
              It has answered 128 conversations this week with an average
              confidence of 94%.
            </p>
            <div className="hero-actions">
              <Button
                variant="secondary"
                onClick={() => onNavigate("playground")}
              >
                Test the agent <ArrowUpRight size={15} />
              </Button>
              <span className="last-updated">Updated 6 min ago</span>
            </div>
          </div>
          <div className="hero-orbit" aria-hidden="true">
            <div className="orbit-ring ring-one" />
            <div className="orbit-ring ring-two" />
            <div className="orbit-center">
              <Bot size={25} />
            </div>
            <div className="orbit-node node-one" />
            <div className="orbit-node node-two" />
            <div className="orbit-node node-three" />
          </div>
        </section>
        <section className="stat-row">
          <div className="stat-card">
            <div className="stat-label">
              Conversations <span className="info-dot">i</span>
            </div>
            <div className="stat-value">189</div>
            <div className="stat-delta positive">
              ↗ 18.4% <span>vs. last week</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">
              Avg. response time <span className="info-dot">i</span>
            </div>
            <div className="stat-value">
              1.2<span className="stat-unit">s</span>
            </div>
            <div className="stat-delta positive">
              ↘ 0.3s <span>vs. last week</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">
              Knowledge sources <span className="info-dot">i</span>
            </div>
            <div className="stat-value">3</div>
            <div className="stat-delta neutral">All sources ready</div>
          </div>
        </section>
        <section className="card agents-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR WORKSPACE</span>
              <h3>Agents</h3>
            </div>
            <button
              className="text-button"
              onClick={() => onNavigate("builder")}
            >
              View all <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="agent-table">
            <div className="agent-table-head">
              <span>Agent</span>
              <span>Status</span>
              <span>Last edited</span>
              <span>Tests</span>
              <span />
            </div>
            {agents.map((agent) => (
              <button
                key={agent.name}
                className="agent-row"
                onClick={() =>
                  onNavigate(agent.status === "live" ? "playground" : "builder")
                }
              >
                <div className="agent-name">
                  <span className={`agent-glyph ${agent.status}`}>
                    <Bot size={15} />
                  </span>
                  <span>
                    <strong>{agent.name}</strong>
                    <small>{agent.type}</small>
                  </span>
                </div>
                <StatusBadge status={agent.status} />
                <span className="table-muted">{agent.edited}</span>
                <span className="table-muted mono">{agent.tests}</span>
                <ChevronRight size={15} className="row-arrow" />
              </button>
            ))}
          </div>
        </section>
        <div className="bottom-grid">
          <section className="card activity-card">
            <div className="section-heading">
              <div>
                <span className="eyebrow">RECENT ACTIVITY</span>
                <h3>What’s happening</h3>
              </div>
              <button className="icon-button">
                <MoreHorizontal size={17} />
              </button>
            </div>
            <Activity
              icon={<Upload size={15} />}
              color="lime"
              text="Knowledge base indexed"
              meta="pricing-2026.pdf · 6 min ago"
            />
            <Activity
              icon={<Zap size={15} />}
              color="amber"
              text="Northstar support published"
              meta="Version 1.4 · Today, 9:58 AM"
            />
            <Activity
              icon={<MessageSquareText size={15} />}
              color="blue"
              text="New test conversation"
              meta="Inbound qualifier · Yesterday"
            />
          </section>
          <section className="card checklist-card">
            <div className="section-heading">
              <div>
                <span className="eyebrow">NEXT UP</span>
                <h3>Setup checklist</h3>
              </div>
              <span className="checklist-count">3 / 5</span>
            </div>
            <Checklist done text="Create your workspace" />
            <Checklist done text="Create your first agent" />
            <Checklist done text="Add a knowledge source" />
            <Checklist
              text="Run a test conversation"
              onClick={() => onNavigate("playground")}
            />
            <Checklist
              text="Deploy your agent"
              onClick={() => onNavigate("deploy")}
            />
          </section>
        </div>
      </div>
    </div>
  )
}

function Activity({
  icon,
  color,
  text,
  meta,
}: {
  icon: ReactNode
  color: string
  text: string
  meta: string
}) {
  return (
    <div className="activity-row">
      <span className={`activity-icon ${color}`}>{icon}</span>
      <span>
        <strong>{text}</strong>
        <small>{meta}</small>
      </span>
      <ChevronRight size={14} className="row-arrow" />
    </div>
  )
}

function Checklist({
  done,
  text,
  onClick,
}: {
  done?: boolean
  text: string
  onClick?: () => void
}) {
  return (
    <button className="check-row" onClick={onClick}>
      <span className={`check-box ${done ? "checked" : ""}`}>
        {done && <Check size={11} />}
      </span>
      <span className={done ? "done" : ""}>{text}</span>
      {!done && <ChevronRight size={14} className="row-arrow" />}
    </button>
  )
}


import { useState } from "react"
import {
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  LockKeyhole,
  UserRound,
} from "lucide-react"
import { Button } from "@/components/Button"
import { PageHeader } from "@/components/PageHeader"
import { StatusBadge } from "@/components/StatusBadge"

export function Deploy() {
  const [copied, setCopied] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const code = `import { RelayAgent } from '@relay-ai/react'\n\nexport default function Support() {\n  return (\n    <RelayAgent\n      agentId="agt_northstar_01"\n      apiKey="rly_live_••••••••"\n    />\n  )\n}`
  return (
    <div className="content-container deploy-page">
      <PageHeader
        eyebrow="INBOUND QUALIFIER / DEPLOY"
        title="Put it to work."
        description="Your agent is ready when you are. Start with a private test or ship it to your product."
        actions={
          <Button icon={<ArrowUpRight size={15} />}>Open SDK docs</Button>
        }
      />
      <div className="deploy-grid">
        <section className="card deploy-status-card">
          <div className="deploy-status-top">
            <div>
              <span className="eyebrow">PUBLISH STATUS</span>
              <h3>Inbound qualifier</h3>
            </div>
            <StatusBadge status="ready" />
          </div>
          <div className="publish-line">
            <span className="publish-dot" />
            <span />
            <span className="publish-dot" />
            <span />
            <span className="publish-dot muted" />
          </div>
          <div className="publish-labels">
            <span>Draft saved</span>
            <span>Published</span>
            <span>Production</span>
          </div>
          <div className="deploy-note">
            <span className="signal-dot" />
            <span>
              <strong>Ready to publish</strong>
              <small>
                Your agent has a knowledge base and passed its latest test.
              </small>
            </span>
            <Button onClick={() => setCopied(true)}>Publish agent</Button>
          </div>
        </section>
        <section className="card key-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">AUTHENTICATION</span>
              <h3>API key</h3>
            </div>
            <LockKeyhole size={17} className="muted-icon" />
          </div>
          <p>
            Use this key to authenticate requests from your server or embed.
          </p>
          <div className="key-field">
            <code>
              {revealed
                ? "rly_live_7c1a0b8e4f2d9a31"
                : "rly_live_••••••••••••••••"}
            </code>
            <button
              className="icon-button"
              onClick={() => setRevealed(!revealed)}
            >
              {revealed ? <UserRound size={15} /> : <LockKeyhole size={15} />}
            </button>
            <button
              className="icon-button"
              onClick={() => {
                navigator.clipboard?.writeText("rly_live_7c1a0b8e4f2d9a31")
                setCopied(true)
              }}
              aria-label="Copy API key"
            >
              <Copy size={15} />
            </button>
          </div>
          <div className="key-footer">
            <span>Created Aug 28, 2026</span>
            <button className="text-button">Rotate key</button>
          </div>
        </section>
        <section className="card code-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">REACT SDK</span>
              <h3>Embed your agent</h3>
            </div>
            <button
              className="copy-code"
              onClick={() => {
                navigator.clipboard?.writeText(code)
                setCopied(true)
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy code"}
            </button>
          </div>
          <p>Add the SDK to your app and render the agent in any React view.</p>
          <pre>
            <code>{code}</code>
          </pre>
          <div className="code-footer">
            <span>
              <span className="status-ping">
                <span /> Production ready
              </span>
            </span>
            <button className="text-button">
              Read the docs <ArrowUpRight size={13} />
            </button>
          </div>
        </section>
        <aside className="deploy-next">
          <div className="deploy-next-icon">
            <Code2 size={18} />
          </div>
          <h3>Build with Relay</h3>
          <p>
            Explore the API reference, SDK methods, and examples for a tailored
            integration.
          </p>
          <button className="text-button">
            Explore the docs <ArrowUpRight size={13} />
          </button>
        </aside>
      </div>
    </div>
  )
}


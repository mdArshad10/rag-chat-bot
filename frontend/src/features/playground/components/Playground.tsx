import { useState } from "react"
import {
  ArrowUpRight,
  BookOpen,
  Bot,
  Check,
  LockKeyhole,
  MessageSquareText,
  MoreHorizontal,
  Paperclip,
  RotateCcw,
  Send,
  Settings2,
  Zap,
} from "lucide-react"
import { Button } from "@/components/Button"
import { PageHeader } from "@/components/PageHeader"
import { Input } from "@/components/ui/input"

export function Playground() {
  const [messages, setMessages] = useState([
    {
      role: "agent",
      text: "Hi Jordan — I’m the Inbound qualifier. I can help you understand if Northstar is a good fit. What’s on your mind?",
      time: "10:47 AM",
    },
    {
      role: "user",
      text: "We need to qualify leads from our website before they reach sales.",
      time: "10:48 AM",
    },
    {
      role: "agent",
      text: "That’s exactly what I can help with. What does your current qualification process look like today?",
      time: "10:48 AM",
    },
  ])
  const [draft, setDraft] = useState("")
  const [thinking, setThinking] = useState(false)
  const sendMessage = () => {
    if (!draft.trim() || thinking) return
    const newText = draft.trim()
    setMessages([...messages, { role: "user", text: newText, time: "Now" }])
    setDraft("")
    setThinking(true)
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          text: "Got it. I’ll keep that context in mind as we narrow down the right next step.",
          time: "Now",
        },
      ])
      setThinking(false)
    }, 900)
  }
  return (
    <div className="content-container playground-page">
      <PageHeader
        eyebrow="INBOUND QUALIFIER / PLAYGROUND"
        title="Have a conversation."
        description="Test the draft agent with the same context your customers will see."
        actions={
          <>
            <Button
              variant="ghost"
              icon={<RotateCcw size={14} />}
              onClick={() => setMessages([])}
            >
              Reset
            </Button>
            <Button
              onClick={() => setThinking(!thinking)}
              icon={<Zap size={14} />}
            >
              {thinking ? "Agent is thinking" : "Draft mode"}
            </Button>
          </>
        }
      />
      <div className="playground-layout">
        <section className="card chat-panel">
          <div className="chat-header">
            <div className="chat-agent">
              <span className="agent-glyph draft">
                <Bot size={17} />
              </span>
              <span>
                <strong>Inbound qualifier</strong>
                <small>Draft · Claude 3.5 Sonnet</small>
              </span>
            </div>
            <span className="connection-status">
              <span /> Connected
            </span>
          </div>
          <div className="chat-body">
            {messages.length === 0 && (
              <div className="chat-empty">
                <span className="chat-empty-icon">
                  <MessageSquareText size={21} />
                </span>
                <h3>Start a test conversation</h3>
                <p>
                  Ask the agent anything. This is a safe space to try the edges.
                </p>
              </div>
            )}
            {messages.map((message, i) => (
              <div
                className={`message-row ${message.role}`}
                key={`${message.time}-${i}`}
              >
                <span className={`message-avatar ${message.role}`}>
                  {message.role === "agent" ? <Bot size={14} /> : "JD"}
                </span>
                <div className="message-stack">
                  <div className={`message-bubble ${message.role}`}>
                    {message.text}
                  </div>
                  <span className="message-time">{message.time}</span>
                </div>
              </div>
            ))}
            {thinking && (
              <div className="message-row agent">
                <span className="message-avatar agent">
                  <Bot size={14} />
                </span>
                <div className="message-stack">
                  <div className="message-bubble agent thinking-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="chat-composer">
            <button className="icon-button" aria-label="Attach file">
              <Paperclip size={17} />
            </button>
            <Input
              className="chat-input"
              value={draft}
              placeholder="Message your agent…"
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage()
              }}
            />
            <button
              className="send-button"
              aria-label="Send message"
              onClick={sendMessage}
            >
              <Send size={16} />
            </button>
            <div className="composer-hint">
              <span className="mono">⌘ ↵</span> to send
            </div>
          </div>
        </section>
        <aside className="playground-aside">
          <section className="card context-card">
            <div className="section-heading">
              <div>
                <span className="eyebrow">AGENT SIGNAL</span>
                <h3>What’s in context</h3>
              </div>
              <span className="context-live">
                <span /> Live
              </span>
            </div>
            <div className="signal-item">
              <span className="signal-item-icon lime">
                <BookOpen size={14} />
              </span>
              <span>
                <strong>Knowledge retrieval</strong>
                <small>3 sources available</small>
              </span>
              <Check size={14} className="check-green" />
            </div>
            <div className="signal-item">
              <span className="signal-item-icon amber">
                <Settings2 size={14} />
              </span>
              <span>
                <strong>Delegations</strong>
                <small>2 workers configured</small>
              </span>
              <Check size={14} className="check-amber" />
            </div>
            <div className="signal-item">
              <span className="signal-item-icon blue">
                <LockKeyhole size={14} />
              </span>
              <span>
                <strong>Guardrails</strong>
                <small>On-topic mode enabled</small>
              </span>
              <Check size={14} className="check-blue" />
            </div>
          </section>
          <section className="card notes-card">
            <div className="section-heading">
              <div>
                <span className="eyebrow">TEST NOTES</span>
                <h3>Keep an eye out</h3>
              </div>
              <MoreHorizontal size={17} className="muted-icon" />
            </div>
            <p>
              Try asking about pricing, an edge case, or something outside the
              knowledge base.
            </p>
            <button className="text-button">
              View test guide <ArrowUpRight size={13} />
            </button>
          </section>
        </aside>
      </div>
    </div>
  )
}


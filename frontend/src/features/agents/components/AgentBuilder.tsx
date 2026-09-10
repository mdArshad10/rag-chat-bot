import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  Plus,
  Send,
  Sparkles,
  X,
  Zap,
} from "lucide-react"
import { Button } from "@/components/Button"
import { Field } from "@/components/Field"
import { PageHeader } from "@/components/PageHeader"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { agentBuilderSchema } from "../schemas/agent-schema"
import { BuilderSection } from "./BuilderSection"
import type { Page } from "@/features/workspace/types"

export function AgentBuilder({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [saved, setSaved] = useState(true)
  const [guardrail, setGuardrail] = useState(true)
  const builderForm = useForm({
    defaultValues: {
      name: "Inbound qualifier",
      description:
        "Qualify inbound leads and route the right opportunities to our sales team.",
      prompt:
        "You are the first point of contact for Northstar Labs.\n\nYour job is to understand what a visitor needs, ask thoughtful follow-up questions, and identify whether Northstar is a good fit for their team. Be concise, warm, and honest. Never invent pricing or product capabilities.",
      temperature: 0.3,
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = agentBuilderSchema.safeParse(value)
        return result.success ? undefined : result.error.issues[0]?.message
      },
    },
    onSubmit: ({ value }) => {
      if (agentBuilderSchema.safeParse(value).success) setSaved(true)
    },
  })
  const publishAgent = () => {
    const result = agentBuilderSchema.safeParse(builderForm.state.values)
    if (result.success) onNavigate("deploy")
    else void builderForm.handleSubmit()
  }
  const [delegations, setDelegations] = useState([
    {
      name: "Billing & account questions",
      description: "Handles invoices, plan changes, and account access.",
    },
    {
      name: "Escalate to a human",
      description:
        "Routes sensitive or unresolved questions to the support team.",
    },
  ])
  return (
    <div className="content-container builder-page">
      <PageHeader
        eyebrow="AGENT BUILDER / DRAFT"
        title="Inbound qualifier"
        description="Configure how your agent thinks, speaks, and knows."
        actions={
          <>
            <span className={`save-state ${saved ? "saved" : "saving"}`}>
              <span />
              {saved ? "All changes saved" : "Saving…"}
            </span>
            <Button
              variant="secondary"
              onClick={() => void builderForm.handleSubmit()}
            >
              Save draft
            </Button>
            <Button onClick={publishAgent} icon={<Zap size={15} />}>
              Publish
            </Button>
          </>
        }
      />
      <div className="builder-layout">
        <form
          className="builder-main"
          onSubmit={(e) => {
            e.preventDefault()
            void builderForm.handleSubmit()
          }}
        >
          <BuilderSection
            number="01"
            title="Identity"
            description="Give your agent a clear job and a point of view."
          >
            <div className="form-grid">
              <builderForm.Field
                name="name"
                validators={{
                  onBlur: ({ value }) => {
                    const result =
                      agentBuilderSchema.shape.name.safeParse(value)
                    return result.success
                      ? undefined
                      : result.error.issues[0]?.message
                  },
                }}
              >
                {(field) => (
                  <Field
                    label="Agent name"
                    invalid={
                      field.state.meta.isTouched &&
                      Boolean(field.state.meta.errors[0])
                    }
                  >
                    <Input
                      value={field.state.value}
                      aria-invalid={
                        field.state.meta.isTouched &&
                        Boolean(field.state.meta.errors[0])
                      }
                      onChange={(e) => {
                        field.handleChange(e.target.value)
                        setSaved(false)
                      }}
                      onBlur={field.handleBlur}
                    />
                    {field.state.meta.isTouched &&
                      field.state.meta.errors[0] && (
                        <span className="field-error">
                          {String(field.state.meta.errors[0])}
                        </span>
                      )}
                  </Field>
                )}
              </builderForm.Field>
              <Field label="Primary use case">
                <button type="button" className="select-field">
                  <span>Lead qualification</span>
                  <ChevronDown size={15} />
                </button>
              </Field>
            </div>
            <builderForm.Field
              name="description"
              validators={{
                onBlur: ({ value }) => {
                  const result =
                    agentBuilderSchema.shape.description.safeParse(value)
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message
                },
              }}
            >
              {(field) => (
                <Field
                  label="Short description"
                  invalid={
                    field.state.meta.isTouched &&
                    Boolean(field.state.meta.errors[0])
                  }
                >
                  <Input
                    value={field.state.value}
                    aria-invalid={
                      field.state.meta.isTouched &&
                      Boolean(field.state.meta.errors[0])
                    }
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                      setSaved(false)
                    }}
                    onBlur={field.handleBlur}
                  />
                  {field.state.meta.isTouched && field.state.meta.errors[0] && (
                    <span className="field-error">
                      {String(field.state.meta.errors[0])}
                    </span>
                  )}
                </Field>
              )}
            </builderForm.Field>
          </BuilderSection>
          <BuilderSection
            number="02"
            title="Instructions"
            description="The rules your agent follows in every conversation."
          >
            <builderForm.Field
              name="prompt"
              validators={{
                onBlur: ({ value }) => {
                  const result =
                    agentBuilderSchema.shape.prompt.safeParse(value)
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message
                },
              }}
            >
              {(field) => (
                <Field
                  label="System prompt"
                  hint="Keep it specific to get more consistent results."
                  invalid={
                    field.state.meta.isTouched &&
                    Boolean(field.state.meta.errors[0])
                  }
                >
                  <Textarea
                    className="prompt-input"
                    value={field.state.value}
                    aria-invalid={
                      field.state.meta.isTouched &&
                      Boolean(field.state.meta.errors[0])
                    }
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                      setSaved(false)
                    }}
                    onBlur={field.handleBlur}
                  />
                  {field.state.meta.isTouched && field.state.meta.errors[0] && (
                    <span className="field-error">
                      {String(field.state.meta.errors[0])}
                    </span>
                  )}
                  <div className="field-footer">
                    <span>
                      <Sparkles size={13} /> Prompt suggestions available
                    </span>
                    <button type="button" className="text-button">
                      Improve prompt <ArrowUpRight size={13} />
                    </button>
                  </div>
                </Field>
              )}
            </builderForm.Field>
          </BuilderSection>
          <BuilderSection
            number="03"
            title="Behavior"
            description="Tune how your agent responds and when it should ask for help."
          >
            <div className="model-row">
              <div className="model-select">
                <span className="model-logo">◎</span>
                <span>
                  <small>Model</small>
                  <strong>Claude 3.5 Sonnet</strong>
                </span>
                <ChevronDown size={15} />
              </div>
              <builderForm.Field
                name="temperature"
                validators={{
                  onBlur: ({ value }) => {
                    const result =
                      agentBuilderSchema.shape.temperature.safeParse(value)
                    return result.success
                      ? undefined
                      : result.error.issues[0]?.message
                  },
                }}
              >
                {(field) => (
                  <Field
                    label="Temperature"
                    invalid={
                      field.state.meta.isTouched &&
                      Boolean(field.state.meta.errors[0])
                    }
                  >
                    <div className="temperature-control">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={field.state.value}
                        onChange={(e) => {
                          field.handleChange(Number(e.target.value))
                          setSaved(false)
                        }}
                        onBlur={field.handleBlur}
                      />
                      <span className="mono">{field.state.value}</span>
                    </div>
                    {field.state.meta.isTouched &&
                      field.state.meta.errors[0] && (
                        <span className="field-error">
                          {String(field.state.meta.errors[0])}
                        </span>
                      )}
                  </Field>
                )}
              </builderForm.Field>
            </div>
            <div className="toggle-row">
              <div>
                <strong>Stay on topic</strong>
                <small>Keep replies grounded in the knowledge base.</small>
              </div>
              <button
                type="button"
                className={`toggle ${guardrail ? "on" : ""}`}
                onClick={() => setGuardrail(!guardrail)}
                aria-label="Toggle stay on topic"
              >
                <span />
              </button>
            </div>
          </BuilderSection>
          <BuilderSection
            number="04"
            title="Delegations"
            description="Let your agent hand off specific jobs to a focused worker. No flowchart needed."
          >
            <div className="delegation-list">
              {delegations.map((item, i) => (
                <div className="delegation-row" key={item.name}>
                  <span className="delegation-handle">⠿</span>
                  <span className="delegation-number">0{i + 1}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.description}</small>
                  </div>
                  <button
                    className="icon-button"
                    onClick={() =>
                      setDelegations(
                        delegations.filter((_, index) => index !== i)
                      )
                    }
                    aria-label={`Remove ${item.name}`}
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
            <button
              className="add-delegation"
              onClick={() =>
                setDelegations([
                  ...delegations,
                  {
                    name: "New delegated task",
                    description:
                      "Describe when the agent should hand this off.",
                  },
                ])
              }
            >
              <Plus size={15} /> Add delegated task
            </button>
          </BuilderSection>
        </form>
        <aside className="builder-aside">
          <div className="preview-card card">
            <div className="preview-header">
              <span className="eyebrow">LIVE PREVIEW</span>
              <span className="live-indicator">
                <span /> Draft
              </span>
            </div>
            <div className="preview-agent">
              <span className="agent-glyph draft">
                <Bot size={17} />
              </span>
              <span>
                <strong>Inbound qualifier</strong>
                <small>Northstar Labs</small>
              </span>
            </div>
            <div className="preview-bubble agent-bubble">
              Hi there — I’m here to help you find the right fit for your team.
              What are you hoping to improve?
            </div>
            <div className="preview-bubble user-bubble">
              We’re looking for a way to qualify inbound demos.
            </div>
            <div className="preview-input">
              Send a message… <Send size={14} />
            </div>
            <button
              className="preview-link"
              onClick={() => onNavigate("playground")}
            >
              Open playground <ArrowUpRight size={13} />
            </button>
          </div>
          <div className="tip-card">
            <span className="tip-icon">
              <Sparkles size={15} />
            </span>
            <div>
              <strong>Make it yours</strong>
              <p>
                Agents with a specific point of view feel more natural in
                conversation.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}


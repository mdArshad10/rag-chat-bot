import { useState } from "react"
import { ArrowUpRight, Check, Gauge, MoreHorizontal, Upload } from "lucide-react"
import { Button } from "@/components/Button"
import { PageHeader } from "@/components/PageHeader"
import { StatusBadge } from "@/components/StatusBadge"
import { Input } from "@/components/ui/input"

export function KnowledgeBase() {
  const [files, setFiles] = useState([
    {
      name: "pricing-2026.pdf",
      type: "PDF",
      size: "2.4 MB",
      status: "ready" as const,
      updated: "6 min ago",
    },
    {
      name: "product-faq.txt",
      type: "TXT",
      size: "18 KB",
      status: "ready" as const,
      updated: "Yesterday",
    },
    {
      name: "case-studies.pdf",
      type: "PDF",
      size: "8.1 MB",
      status: "indexing" as const,
      updated: "Just now",
    },
  ])
  const [dragging, setDragging] = useState(false)
  const addFiles = (newFiles: FileList | File[]) => {
    const file = newFiles[0]
    if (file)
      setFiles([
        ...files,
        {
          name: file.name,
          type: "FILE",
          size: "New upload",
          status: "indexing",
          updated: "Just now",
        },
      ])
  }
  return (
    <div className="content-container knowledge-page">
      <PageHeader
        eyebrow="INBOUND QUALIFIER / KNOWLEDGE BASE"
        title="Make your agent useful."
        description="Give it the context it needs to answer with confidence."
        actions={
          <Button
            icon={<Upload size={15} />}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            Upload source
          </Button>
        }
      />
      <input
        id="file-input"
        type="file"
        hidden
        multiple
        onChange={(e) => e.target.files && addFiles(e.target.files)}
      />
      <div className="knowledge-grid">
        <div className="knowledge-main">
          <div
            className={`upload-zone ${dragging ? "dragging" : ""}`}
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              addFiles(e.dataTransfer.files)
            }}
          >
            <div className="upload-icon">
              <Upload size={19} />
            </div>
            <h3>Drop files here to add knowledge</h3>
            <p>PDF, TXT, DOCX, or paste FAQs directly</p>
            <button
              className="text-button"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              Browse files <ArrowUpRight size={13} />
            </button>
          </div>
          <section className="card sources-card">
            <div className="section-heading">
              <div>
                <span className="eyebrow">SOURCES · {files.length}</span>
                <h3>Knowledge sources</h3>
              </div>
              <button className="icon-button">
                <MoreHorizontal size={17} />
              </button>
            </div>
            <div className="source-list">
              {files.map((file, i) => (
                <div className="source-row" key={`${file.name}-${i}`}>
                  <span className={`file-icon ${file.type.toLowerCase()}`}>
                    {file.type}
                  </span>
                  <div className="source-name">
                    <strong>{file.name}</strong>
                    <small>
                      {file.size} · Updated {file.updated}
                    </small>
                  </div>
                  <StatusBadge status={file.status} />
                  <button
                    className="icon-button source-more"
                    aria-label={`More options for ${file.name}`}
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="knowledge-aside">
          <div className="card retrieval-card">
            <div className="section-heading">
              <div>
                <span className="eyebrow">RETRIEVAL CHECK</span>
                <h3>Ask your sources</h3>
              </div>
              <Gauge size={17} className="muted-icon" />
            </div>
            <p>
              Check what your agent will find before you start a conversation.
            </p>
            <div className="retrieval-input">
              <Input placeholder="e.g. What does the Pro plan include?" />
              <button aria-label="Search sources">
                <ArrowUpRight size={15} />
              </button>
            </div>
            <div className="retrieval-result">
              <span className="result-check">
                <Check size={12} />
              </span>
              <span>
                <strong>3 relevant chunks found</strong>
                <small>From pricing-2026.pdf · 0.91 relevance</small>
              </span>
            </div>
          </div>
          <div className="indexing-card">
            <div className="indexing-graphic">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div>
              <strong>How indexing works</strong>
              <p>
                We turn your sources into searchable context your agent can
                retrieve at the right moment.
              </p>
              <button className="text-button">
                Learn more <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}


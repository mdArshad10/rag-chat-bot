import type { ReactNode } from "react"

export function BuilderSection({
  number,
  title,
  description,
  children,
}: {
  number: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="builder-section">
      <div className="section-index">{number}</div>
      <div className="builder-section-content">
        <div className="builder-section-title">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        {children}
      </div>
    </section>
  )
}


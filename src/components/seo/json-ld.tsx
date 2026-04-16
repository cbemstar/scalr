type JsonLdProps = {
  data: Record<string, unknown>
}

/** Server-safe JSON-LD script for structured data (GEO / rich results). */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

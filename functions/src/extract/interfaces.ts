export interface Extracted {
  body: string
  extractor: string
  tags?: string[]
  type: "text" | "video"
}

export type Extractor = (html: string) => Extracted | null

export interface ExtractorItem {
  pattern: RegExp
  extract: Extractor
}

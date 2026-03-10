export type ExampleStatus = 'draft' | 'published' | 'archived'

export interface Example {
  id: string
  title: string
  summary: string
  description: string
  status: ExampleStatus
}

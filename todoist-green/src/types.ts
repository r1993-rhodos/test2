export type Project = {
  id: string
  name: string
}

export type ViewType = 'inbox' | 'today' | 'upcoming' | 'project'

export type View = {
  type: ViewType
  projectId?: string
}

export type Task = {
  id: string
  title: string
  completed: boolean
  projectId: string
  dueDate?: string
  priority: number
  createdAt: string
  notes?: string
}
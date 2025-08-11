import { useTasksStore } from '../store/useTasksStore'
import { TaskInput } from './TaskInput'
import type { View, Project } from '../types'

function titleFromView(view: View, projects: Project[]) {
  if (view.type === 'inbox') return 'Inbox'
  if (view.type === 'today') return 'Today'
  if (view.type === 'upcoming') return 'Upcoming'
  if (view.type === 'project') return projects.find((p) => p.id === view.projectId)?.name || 'Project'
  return 'Tasks'
}

export function Header() {
  const selectedView = useTasksStore((s) => s.selectedView)
  const projects = useTasksStore((s) => s.projects)
  return (
    <header className="header">
      <h1 className="title">{titleFromView(selectedView, projects)}</h1>
      <TaskInput />
    </header>
  )
}
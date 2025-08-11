import { useTasksStore } from '../store/useTasksStore'
import { TaskInput } from './TaskInput'
import { shallow } from 'zustand/shallow'

function titleFromView(view: ReturnType<typeof useTasksStore.getState>['selectedView'], projects: ReturnType<typeof useTasksStore.getState>['projects']) {
  if (view.type === 'inbox') return 'Inbox'
  if (view.type === 'today') return 'Today'
  if (view.type === 'upcoming') return 'Upcoming'
  if (view.type === 'project') return projects.find((p) => p.id === view.projectId)?.name || 'Project'
  return 'Tasks'
}

export function Header() {
  const { selectedView, projects } = useTasksStore((s) => ({ selectedView: s.selectedView, projects: s.projects }), shallow)
  return (
    <header className="header">
      <h1 className="title">{titleFromView(selectedView, projects)}</h1>
      <TaskInput />
    </header>
  )
}
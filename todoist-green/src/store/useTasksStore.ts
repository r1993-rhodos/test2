import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { isToday, startOfDay } from 'date-fns'
import type { Task, Project, View } from '../types'

const INBOX_ID = 'inbox'

type State = {
  tasks: Task[]
  projects: Project[]
  selectedView: View
  addTask: (input: { title: string; projectId?: string; dueDate?: string | null; priority?: number; notes?: string }) => void
  toggleTask: (taskId: string) => void
  deleteTask: (taskId: string) => void
  updateTask: (taskId: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void
  addProject: (name: string) => void
  deleteProject: (projectId: string) => void
  selectView: (view: View) => void
}

const generateId = () => Math.random().toString(36).slice(2) + Date.now().toString(36)

export const useTasksStore = create<State>()(
  persist(
    (set, _get) => ({
      tasks: [],
      projects: [{ id: INBOX_ID, name: 'Inbox' }],
      selectedView: { type: 'inbox' },

      addTask: ({ title, projectId, dueDate, priority = 4, notes }) =>
        set((state) => {
          const id = generateId()
          const newTask: Task = {
            id,
            title: title.trim(),
            completed: false,
            projectId: projectId ?? INBOX_ID,
            dueDate: dueDate ?? undefined,
            priority,
            notes,
            createdAt: new Date().toISOString(),
          }
          return { tasks: [newTask, ...state.tasks] }
        }),

      toggleTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
        })),

      deleteTask: (taskId) => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== taskId) })),

      updateTask: (taskId, updates) =>
        set((state) => ({ tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)) })),

      addProject: (name) =>
        set((state) => ({ projects: [...state.projects, { id: generateId(), name: name.trim() }] })),

      deleteProject: (projectId) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== projectId && p.id !== INBOX_ID),
          tasks: state.tasks
            .map((t) => (t.projectId === projectId ? { ...t, projectId: INBOX_ID } : t)),
        })),

      selectView: (view) => set({ selectedView: view }),
    }),
    {
      name: 'todoist-green-v1',
      partialize: (state) => ({ tasks: state.tasks, projects: state.projects, selectedView: state.selectedView }),
    }
  )
)

export function getTasksForCurrentView(tasks: Task[], view: View): Task[] {
  const nowStart = startOfDay(new Date())
  if (view.type === 'inbox') {
    return tasks.filter((t) => !t.completed && t.projectId === INBOX_ID)
  }
  if (view.type === 'today') {
    return tasks.filter((t) => !t.completed && t.dueDate && isToday(new Date(t.dueDate)))
  }
  if (view.type === 'upcoming') {
    return tasks.filter((t) => !t.completed && t.dueDate && new Date(t.dueDate) > nowStart)
  }
  if (view.type === 'project' && view.projectId) {
    return tasks.filter((t) => !t.completed && t.projectId === view.projectId)
  }
  return tasks.filter((t) => !t.completed)
}

export { INBOX_ID }
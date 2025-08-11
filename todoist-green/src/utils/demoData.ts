import { Task, Project } from '../types'

export const demoProjects: Project[] = [
  { id: 'work', name: 'Work Projects' },
  { id: 'personal', name: 'Personal Goals' },
  { id: 'health', name: 'Health & Fitness' },
  { id: 'learning', name: 'Learning' },
]

export const demoTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project presentation',
    completed: false,
    projectId: 'work',
    dueDate: new Date().toISOString(),
    priority: 1,
    createdAt: new Date().toISOString(),
    notes: 'Need to prepare slides for the quarterly review meeting'
  },
  {
    id: '2',
    title: 'Go for a 30-minute run',
    completed: false,
    projectId: 'health',
    dueDate: new Date().toISOString(),
    priority: 2,
    createdAt: new Date().toISOString(),
    notes: 'Aim for 5k distance'
  },
  {
    id: '3',
    title: 'Read React documentation',
    completed: false,
    projectId: 'learning',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 3,
    createdAt: new Date().toISOString(),
    notes: 'Focus on hooks and context API'
  },
  {
    id: '4',
    title: 'Plan weekend trip',
    completed: false,
    projectId: 'personal',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 4,
    createdAt: new Date().toISOString(),
    notes: 'Research destinations and book accommodation'
  },
  {
    id: '5',
    title: 'Call mom',
    completed: false,
    projectId: 'personal',
    priority: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Review code changes',
    completed: true,
    projectId: 'work',
    dueDate: new Date().toISOString(),
    priority: 1,
    createdAt: new Date().toISOString(),
    notes: 'PR #123 needs review before merge'
  }
]

export function loadDemoData() {
  // This function can be called to populate the store with demo data
  return { projects: demoProjects, tasks: demoTasks }
}
import { AnimatePresence } from 'framer-motion'
import { useTasksStore } from '../store/useTasksStore'
import { getTasksForCurrentView } from '../store/useTasksStore'
import { TaskItem } from './TaskItem'
import type { Task } from '../types'

export function TaskList() {
  const { tasks, selectedView } = useTasksStore((s) => ({ tasks: s.tasks, selectedView: s.selectedView }))
  const visibleTasks = getTasksForCurrentView(tasks, selectedView)

  return (
    <div className="task-list">
      <AnimatePresence initial={false}>
        <ul>
          {visibleTasks.map((task: Task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      </AnimatePresence>
      {visibleTasks.length === 0 && (
        <div className="empty">No tasks here. Add one above!</div>
      )}
    </div>
  )
}
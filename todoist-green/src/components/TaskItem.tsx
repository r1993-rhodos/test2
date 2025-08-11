import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { format } from 'date-fns'
import { FiTrash2, FiCheckCircle, FiCircle } from 'react-icons/fi'
import { useTasksStore } from '../store/useTasksStore'
import type { Task } from '../types'
import { shallow } from 'zustand/shallow'

type Props = {
  task: Task
}

export function TaskItem({ task }: Props) {
  const { toggleTask, deleteTask } = useTasksStore((s) => ({ toggleTask: s.toggleTask, deleteTask: s.deleteTask }), shallow)

  function handleToggle() {
    if (!task.completed) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.2 },
        scalar: 0.8,
        colors: ['#22c55e', '#86efac', '#10b981', '#34d399'],
      })
    }
    toggleTask(task.id)
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      className={`task-item ${task.completed ? 'completed' : ''}`}
    >
      <button className="checkbox" aria-label="complete" onClick={handleToggle}>
        {task.completed ? <FiCheckCircle /> : <FiCircle />}
      </button>
      <div className="content">
        <div className="title-line">
          <span className="title">{task.title}</span>
        </div>
        {task.dueDate && (
          <div className="meta">Due {format(new Date(task.dueDate), 'MMM d')}</div>
        )}
      </div>
      <button className="delete-btn" aria-label="delete" onClick={() => deleteTask(task.id)}>
        <FiTrash2 />
      </button>
    </motion.li>
  )
}
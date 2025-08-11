import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { format } from 'date-fns'
import { FiTrash2, FiCheckCircle, FiCircle, FiFlag, FiStar, FiCalendar } from 'react-icons/fi'
import { useTasksStore } from '../store/useTasksStore'
import type { Task } from '../types'

type Props = {
  task: Task
}

const priorityColors = {
  1: '#ef4444', // red
  2: '#f97316', // orange
  3: '#eab308', // yellow
  4: '#22c55e', // green
  5: '#3b82f6', // blue
}

const priorityLabels = {
  1: 'Urgent',
  2: 'High',
  3: 'Medium',
  4: 'Low',
  5: 'No Priority'
}

export function TaskItem({ task }: Props) {
  const { toggleTask, deleteTask, updateTask } = useTasksStore((s) => ({ 
    toggleTask: s.toggleTask, 
    deleteTask: s.deleteTask,
    updateTask: s.updateTask
  }))

  function handleToggle() {
    if (!task.completed) {
      // Enhanced confetti with multiple bursts
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.3 },
        scalar: 1,
        colors: ['#22c55e', '#86efac', '#10b981', '#34d399', '#fbbf24', '#f59e0b'],
        ticks: 200,
      })
      
      // Second burst after a delay
      setTimeout(() => {
        confetti({
          particleCount: 60,
          spread: 50,
          origin: { y: 0.4, x: 0.3 },
          scalar: 0.8,
          colors: ['#fbbf24', '#f59e0b', '#22c55e'],
        })
      }, 150)
      
      // Third burst
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 40,
          origin: { y: 0.4, x: 0.7 },
          scalar: 0.6,
          colors: ['#86efac', '#10b981'],
        })
      }, 300)
    }
    toggleTask(task.id)
  }

  function handlePriorityChange() {
    const newPriority = task.priority === 5 ? 1 : task.priority + 1
    updateTask(task.id, { priority: newPriority })
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`}
    >
      <motion.button 
        className="checkbox" 
        aria-label="complete" 
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {task.completed ? (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <FiCheckCircle />
          </motion.div>
        ) : (
          <FiCircle />
        )}
      </motion.button>
      
      <div className="content">
        <div className="title-line">
          <span className="title">{task.title}</span>
          {task.priority < 5 && (
            <motion.button
              className="priority-indicator"
              onClick={handlePriorityChange}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ color: priorityColors[task.priority as keyof typeof priorityColors] }}
              title={priorityLabels[task.priority as keyof typeof priorityLabels]}
            >
              <FiFlag />
            </motion.button>
          )}
        </div>
        
        <div className="meta-line">
          {task.dueDate && (
            <div className="meta due-date">
              <FiCalendar />
              Due {format(new Date(task.dueDate), 'MMM d')}
            </div>
          )}
          {task.notes && (
            <div className="meta notes">
              <FiStar />
              Has notes
            </div>
          )}
        </div>
      </div>
      
      <motion.button 
        className="delete-btn" 
        aria-label="delete" 
        onClick={() => deleteTask(task.id)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <FiTrash2 />
      </motion.button>
    </motion.li>
  )
}
import { motion, AnimatePresence } from 'framer-motion'
import { useTasksStore } from '../store/useTasksStore'
import { getTasksForCurrentView } from '../store/useTasksStore'
import { TaskItem } from './TaskItem'
import { FiCheckCircle, FiPlus, FiTarget } from 'react-icons/fi'
import type { Task } from '../types'

const emptyStateMessages = {
  inbox: {
    title: "Your inbox is clear! 🎉",
    message: "All caught up. Time to tackle new challenges or take a well-deserved break.",
    icon: "📬"
  },
  today: {
    title: "No tasks for today! 🌅",
    message: "Great job! You're all set for today. Maybe plan ahead for tomorrow?",
    icon: "☀️"
  },
  upcoming: {
    title: "Nothing on the horizon! 🔮",
    message: "No upcoming tasks. Perfect time to plan ahead or focus on long-term goals.",
    icon: "🌟"
  },
  project: {
    title: "Project is empty! 📁",
    message: "This project has no tasks yet. Start building something amazing!",
    icon: "🚀"
  }
}

export function TaskList() {
  const { tasks, selectedView } = useTasksStore((s) => ({ tasks: s.tasks, selectedView: s.selectedView }))
  const visibleTasks = getTasksForCurrentView(tasks, selectedView)
  
  const emptyState = emptyStateMessages[selectedView.type] || emptyStateMessages.inbox

  return (
    <motion.div 
      className="task-list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence initial={false} mode="wait">
        {visibleTasks.length > 0 ? (
          <motion.ul
            key="tasks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {visibleTasks.map((task: Task, index: number) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
              >
                <TaskItem task={task} />
              </motion.div>
            ))}
          </motion.ul>
        ) : (
          <motion.div
            key="empty"
            className="empty-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="empty-icon"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.6, 
                type: "spring", 
                stiffness: 200, 
                damping: 20 
              }}
            >
              {emptyState.icon}
            </motion.div>
            
            <motion.h3 
              className="empty-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {emptyState.title}
            </motion.h3>
            
            <motion.p 
              className="empty-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {emptyState.message}
            </motion.p>
            
            <motion.div 
              className="empty-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <motion.button
                className="empty-action-btn"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const input = document.querySelector('.task-input-field') as HTMLInputElement
                  if (input) {
                    input.focus()
                    input.style.transform = 'scale(1.05)'
                    setTimeout(() => input.style.transform = '', 300)
                  }
                }}
              >
                <FiPlus />
                Add your first task
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
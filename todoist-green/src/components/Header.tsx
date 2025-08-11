import { motion } from 'framer-motion'
import { useTasksStore, getTasksForCurrentView } from '../store/useTasksStore'
import { TaskInput } from './TaskInput'
import { FiTrendingUp, FiCheckCircle, FiClock, FiTarget, FiPlay } from 'react-icons/fi'

function titleFromView(view: ReturnType<typeof useTasksStore.getState>['selectedView'], projects: ReturnType<typeof useTasksStore.getState>['projects']) {
  if (view.type === 'inbox') return 'Inbox'
  if (view.type === 'today') return 'Today'
  if (view.type === 'upcoming') return 'Upcoming'
  if (view.type === 'project') return projects.find((p) => p.id === view.projectId)?.name || 'Project'
  return 'Tasks'
}

export function Header() {
  const { selectedView, projects, tasks, loadDemoData, clearAllData } = useTasksStore((s) => ({ 
    selectedView: s.selectedView, 
    projects: s.projects,
    tasks: s.tasks,
    loadDemoData: s.loadDemoData,
    clearAllData: s.clearAllData
  }))
  
  const currentViewTasks = getTasksForCurrentView(tasks, selectedView)
  const completedToday = tasks.filter(t => t.completed && new Date(t.createdAt).toDateString() === new Date().toDateString()).length
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  
  const progressBarWidth = currentViewTasks.length > 0 
    ? Math.round((currentViewTasks.filter(t => t.completed).length / currentViewTasks.length) * 100)
    : 0

  return (
    <motion.header 
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="header-top">
        <div className="header-left">
          <motion.h1 
            className="title"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {titleFromView(selectedView, projects)}
          </motion.h1>
          
          {currentViewTasks.length > 0 && (
            <div className="view-stats">
              <span className="task-count">
                {currentViewTasks.filter(t => !t.completed).length} remaining
              </span>
              {currentViewTasks.filter(t => t.completed).length > 0 && (
                <span className="completed-count">
                  {currentViewTasks.filter(t => t.completed).length} completed
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="header-right">
          {tasks.length === 0 && (
            <motion.button
              className="demo-btn"
              onClick={loadDemoData}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Load demo data to test the app"
            >
              <FiPlay />
              Load Demo
            </motion.button>
          )}
          
          {tasks.length > 0 && (
            <motion.button
              className="clear-btn"
              onClick={clearAllData}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Clear all data"
            >
              Clear All
            </motion.button>
          )}
          
          <motion.div 
            className="stats-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <FiTrendingUp className="stats-icon" />
            <div className="stats-content">
              <div className="stats-value">{completionRate}%</div>
              <div className="stats-label">Completion Rate</div>
            </div>
          </motion.div>
          
          <motion.div 
            className="stats-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <FiCheckCircle className="stats-icon" />
            <div className="stats-content">
              <div className="stats-value">{completedToday}</div>
              <div className="stats-label">Today</div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {currentViewTasks.length > 0 && (
        <motion.div 
          className="progress-section"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="progress-header">
            <FiTarget className="progress-icon" />
            <span>Progress</span>
          </div>
          <div className="progress-bar-container">
            <motion.div 
              className="progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${progressBarWidth}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <span className="progress-text">{progressBarWidth}% complete</span>
        </motion.div>
      )}
      
      <TaskInput />
    </motion.header>
  )
}
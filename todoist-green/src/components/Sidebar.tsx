import { motion, AnimatePresence } from 'framer-motion'
import { FiInbox, FiSun, FiCalendar, FiPlus, FiFolder, FiTrash2, FiX } from 'react-icons/fi'
import { useState } from 'react'
import { useTasksStore, INBOX_ID } from '../store/useTasksStore'
import type { Project } from '../types'

export function Sidebar() {
  const { projects, selectedView, selectView, addProject, deleteProject } = useTasksStore((s) => ({
    projects: s.projects,
    selectedView: s.selectedView,
    selectView: s.selectView,
    addProject: s.addProject,
    deleteProject: s.deleteProject,
  }))

  const [projectName, setProjectName] = useState('')
  const [showAddProject, setShowAddProject] = useState(false)

  function handleAddProject() {
    const name = projectName.trim()
    if (!name) return
    addProject(name)
    setProjectName('')
    setShowAddProject(false)
  }

  function isActive(type: string, projectId?: string) {
    return (
      selectedView.type === type &&
      (type !== 'project' || selectedView.projectId === projectId)
    )
  }

  const navItems = [
    { type: 'inbox' as const, icon: FiInbox, label: 'Inbox', color: '#22c55e' },
    { type: 'today' as const, icon: FiSun, label: 'Today', color: '#f59e0b' },
    { type: 'upcoming' as const, icon: FiCalendar, label: 'Upcoming', color: '#3b82f6' },
  ]

  return (
    <motion.div 
      className="sidebar-inner"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="brand"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        GreenDo
      </motion.div>
      
      <nav className="nav">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <motion.button
              key={item.type}
              className={`nav-item ${isActive(item.type) ? 'active' : ''}`}
              onClick={() => selectView({ type: item.type })}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                borderLeftColor: isActive(item.type) ? item.color : 'transparent'
              }}
            >
              <Icon style={{ color: item.color }} />
              <span>{item.label}</span>
            </motion.button>
          )
        })}
      </nav>

      <div className="projects">
        <div className="projects-header">
          <FiFolder />
          <span>Projects</span>
        </div>
        
        <div className="project-list">
          <AnimatePresence>
            {projects
              .filter((p) => p.id !== INBOX_ID)
              .map((project: Project, index: number) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ 
                    duration: 0.2, 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  className="project-item-wrapper"
                >
                  <motion.button
                    className={`project-item ${isActive('project', project.id) ? 'active' : ''}`}
                    onClick={() => selectView({ type: 'project', projectId: project.id })}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <span className="dot" />
                    <span className="project-name">{project.name}</span>
                  </motion.button>
                  
                  <motion.button
                    className="delete-project-btn"
                    onClick={() => deleteProject(project.id)}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    title="Delete project"
                  >
                    <FiTrash2 />
                  </motion.button>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
        
        <div className="add-project">
          <AnimatePresence>
            {showAddProject ? (
              <motion.div
                className="add-project-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="input-wrap">
                  <input
                    type="text"
                    placeholder="New project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddProject()}
                    onKeyUp={(e) => e.key === 'Escape' && setShowAddProject(false)}
                    autoFocus
                  />
                </div>
                <div className="form-actions">
                  <motion.button 
                    className="add-btn confirm"
                    onClick={handleAddProject}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiPlus />
                  </motion.button>
                  <motion.button 
                    className="add-btn cancel"
                    onClick={() => setShowAddProject(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiX />
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                className="add-project-btn"
                onClick={() => setShowAddProject(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <FiPlus />
                <span>Add Project</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
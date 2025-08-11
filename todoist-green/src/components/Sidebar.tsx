import { FiInbox, FiSun, FiCalendar, FiPlus } from 'react-icons/fi'
import { useState } from 'react'
import { useTasksStore, INBOX_ID } from '../store/useTasksStore'
import type { Project } from '../types'

export function Sidebar() {
  const projects = useTasksStore((s) => s.projects)
  const selectedView = useTasksStore((s) => s.selectedView)
  const selectView = useTasksStore((s) => s.selectView)
  const addProject = useTasksStore((s) => s.addProject)

  const [projectName, setProjectName] = useState('')

  function handleAddProject() {
    const name = projectName.trim()
    if (!name) return
    addProject(name)
    setProjectName('')
  }

  function isActive(type: string, projectId?: string) {
    return (
      selectedView.type === type &&
      (type !== 'project' || selectedView.projectId === projectId)
    )
  }

  return (
    <div className="sidebar-inner">
      <div className="brand">GreenDo</div>
      <nav className="nav">
        <button className={`nav-item ${isActive('inbox') ? 'active' : ''}`} onClick={() => selectView({ type: 'inbox' })}>
          <FiInbox />
          <span>Inbox</span>
        </button>
        <button className={`nav-item ${isActive('today') ? 'active' : ''}`} onClick={() => selectView({ type: 'today' })}>
          <FiSun />
          <span>Today</span>
        </button>
        <button className={`nav-item ${isActive('upcoming') ? 'active' : ''}`} onClick={() => selectView({ type: 'upcoming' })}>
          <FiCalendar />
          <span>Upcoming</span>
        </button>
      </nav>

      <div className="projects">
        <div className="projects-header">Projects</div>
        <div className="project-list">
          {projects
            .filter((p) => p.id !== INBOX_ID)
            .map((project: Project) => (
              <button
                key={project.id}
                className={`project-item ${isActive('project', project.id) ? 'active' : ''}`}
                onClick={() => selectView({ type: 'project', projectId: project.id })}
              >
                <span className="dot" />
                <span>{project.name}</span>
              </button>
            ))}
        </div>
        <div className="add-project">
          <div className="input-wrap">
            <input
              type="text"
              placeholder="New project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddProject()}
            />
          </div>
          <button className="add-btn" onClick={handleAddProject}>
            <FiPlus />
          </button>
        </div>
      </div>
    </div>
  )
}
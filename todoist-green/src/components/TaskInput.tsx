import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { addDays, format } from 'date-fns'
import { useTasksStore, INBOX_ID } from '../store/useTasksStore'
import { FiPlus, FiCalendar, FiFlag, FiX } from 'react-icons/fi'

const priorityOptions = [
  { value: 1, label: 'Urgent', color: '#ef4444', icon: '🔥' },
  { value: 2, label: 'High', color: '#f97316', icon: '⚡' },
  { value: 3, label: 'Medium', color: '#eab308', icon: '⚡' },
  { value: 4, label: 'Low', color: '#22c55e', icon: '🌱' },
  { value: 5, label: 'No Priority', color: '#6b7280', icon: '•' },
]

export function TaskInput() {
  const { selectedView, addTask } = useTasksStore((s) => ({
    selectedView: s.selectedView,
    addTask: s.addTask,
  }))
  const [title, setTitle] = useState('')
  const [datePicker, setDatePicker] = useState<string>('')
  const [priority, setPriority] = useState(4)
  const [showPriorityPicker, setShowPriorityPicker] = useState(false)
  const [notes, setNotes] = useState('')
  const [showNotes, setShowNotes] = useState(false)

  function resolveProjectId(): string {
    if (selectedView.type === 'project' && selectedView.projectId) return selectedView.projectId
    if (selectedView.type === 'inbox') return INBOX_ID
    return INBOX_ID
  }

  function resolveDueDate(): string | null {
    if (datePicker) return datePicker
    if (selectedView.type === 'today') return new Date().toISOString()
    return null
  }

  function submit() {
    const t = title.trim()
    if (!t) return
    
    addTask({ 
      title: t, 
      projectId: resolveProjectId(), 
      dueDate: resolveDueDate(),
      priority,
      notes: notes.trim() || undefined
    })
    
    setTitle('')
    setDatePicker('')
    setPriority(4)
    setNotes('')
    setShowNotes(false)
  }

  function handleQuickDate(date: string) {
    setDatePicker(date)
    // Animate the input field
    const input = document.querySelector('.task-input-field') as HTMLInputElement
    if (input) {
      input.focus()
      input.style.transform = 'scale(1.02)'
      setTimeout(() => input.style.transform = '', 200)
    }
  }

  return (
    <motion.div 
      className="task-input"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="input-row">
        <motion.input
          className="task-input-field"
          placeholder="Quick add task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
        
        <motion.button
          className="priority-btn"
          onClick={() => setShowPriorityPicker(!showPriorityPicker)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ 
            backgroundColor: priorityOptions.find(p => p.value === priority)?.color,
            color: priority === 5 ? '#fff' : '#fff'
          }}
          title={priorityOptions.find(p => p.value === priority)?.label}
        >
          {priorityOptions.find(p => p.value === priority)?.icon}
        </motion.button>
        
        <motion.button
          className="notes-btn"
          onClick={() => setShowNotes(!showNotes)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Add notes"
        >
          📝
        </motion.button>
      </div>

      <AnimatePresence>
        {showNotes && (
          <motion.div
            className="notes-input"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <textarea
              placeholder="Add notes to this task..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPriorityPicker && (
          <motion.div
            className="priority-picker"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {priorityOptions.map((option) => (
              <motion.button
                key={option.value}
                className={`priority-option ${priority === option.value ? 'selected' : ''}`}
                onClick={() => {
                  setPriority(option.value)
                  setShowPriorityPicker(false)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ borderColor: option.color }}
              >
                <span className="priority-icon">{option.icon}</span>
                <span className="priority-label">{option.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="task-input-actions">
        <motion.button 
          className="date-chip today" 
          onClick={() => handleQuickDate(new Date().toISOString())}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Today
        </motion.button>
        <motion.button 
          className="date-chip tomorrow" 
          onClick={() => handleQuickDate(addDays(new Date(), 1).toISOString())}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Tomorrow
        </motion.button>
        <motion.button 
          className="date-chip next-week" 
          onClick={() => handleQuickDate(addDays(new Date(), 7).toISOString())}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next week
        </motion.button>
        
        <label className="date-picker">
          <FiCalendar />
          <input
            type="date"
            value={datePicker ? format(new Date(datePicker), 'yyyy-MM-dd') : ''}
            onChange={(e) => {
              const val = e.target.value
              setDatePicker(val ? new Date(val + 'T00:00:00').toISOString() : '')
            }}
          />
        </label>
        
        <motion.button 
          className="add-task-btn" 
          onClick={submit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!title.trim()}
        >
          <FiPlus /> Add Task
        </motion.button>
      </div>
    </motion.div>
  )
}
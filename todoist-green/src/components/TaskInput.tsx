import { useState } from 'react'
import { addDays, format } from 'date-fns'
import { useTasksStore, INBOX_ID } from '../store/useTasksStore'
import { FiPlus, FiCalendar } from 'react-icons/fi'

export function TaskInput() {
  const { selectedView, addTask } = useTasksStore((s) => ({
    selectedView: s.selectedView,
    addTask: s.addTask,
  }))
  const [title, setTitle] = useState('')
  const [datePicker, setDatePicker] = useState<string>('')

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
    addTask({ title: t, projectId: resolveProjectId(), dueDate: resolveDueDate() })
    setTitle('')
    setDatePicker('')
  }

  return (
    <div className="task-input">
      <input
        className="task-input-field"
        placeholder="Quick add task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
      />
      <div className="task-input-actions">
        <button className="date-chip" onClick={() => setDatePicker(new Date().toISOString())}>Today</button>
        <button className="date-chip" onClick={() => setDatePicker(addDays(new Date(), 1).toISOString())}>Tomorrow</button>
        <button className="date-chip" onClick={() => setDatePicker(addDays(new Date(), 7).toISOString())}>Next week</button>
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
        <button className="add-task-btn" onClick={submit}>
          <FiPlus /> Add
        </button>
      </div>
    </div>
  )
}
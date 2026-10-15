import { useState } from 'react'

export function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('low')
  const [status, setStatus] = useState('new')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim() === '') return
    onAddTask({ title, description, priority, status })
    setTitle('')
    setDescription('')
    setPriority('low')
    setStatus('new')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
      <input
        type="text"
        placeholder="Название задачи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      </div>
      <div>
      <textarea
        placeholder="Описание задачи"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      </div>
      <div>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Низкий</option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="new">Новая</option>
        <option value="in_progress">В работе</option>
        <option value="completed">Выполнена</option>
      </select>
      </div>
      <button type="submit">Добавить задачу</button>
    </form>
  )
}
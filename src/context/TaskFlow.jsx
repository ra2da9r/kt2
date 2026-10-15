import { useState, useEffect, useContext } from 'react'
import { TaskList } from '../components/TaskList'
import { TaskForm } from '../components/TaskForm'
import { AppContext, ToggleThemeButton } from './ThemeContext'

export function TaskFlow() {
  const [tasks, setTasks] = useState([])
  const { styles } = useContext(AppContext)

  useEffect(() => {
    const root = document.documentElement

    root.style.backgroundColor = styles.backgroundColor
    root.style.color = styles.color
    root.style.colorScheme = styles.colorScheme
    root.style.setProperty('--bg', styles.backgroundColor)
    root.style.setProperty('--text', styles.color)
    root.style.setProperty('--text-h', styles.color)
  }, [styles])

  return (
    <div style={{ ...styles, minHeight: '100vh', padding: '20px' }}>
        <h3>Список задач</h3>
        <TaskForm onAddTask={(task) => {
          setTasks((currentTasks) => [...currentTasks, task])
        }} />
        <TaskList
          tasks={tasks}
          onDeleteTask={(taskToDelete) => {
            setTasks((currentTasks) => currentTasks.filter((task) => task !== taskToDelete))
          }}
          onUpdateTaskStatus={(taskToUpdate, status) => {
            setTasks((currentTasks) => currentTasks.map((task) =>
              task === taskToUpdate ? { ...task, status } : task
            ))
          }}
        />
        <div style={{ marginTop: '20px' }}>
          <p>Общее количество задач: {tasks.length}</p>
          <p>Количество выполненных задач: {tasks.filter(task => task.status === 'completed').length}</p>
          <p>Количество задач в работе: {tasks.filter(task => task.status === 'in_progress').length}</p>
          <p>Процент выполнения: {tasks.length > 0 ? ((tasks.filter(task => task.status === 'completed').length / tasks.length) * 100).toFixed(2) : 0}%</p>
        </div>
        <ToggleThemeButton />
    </div>
  )
}



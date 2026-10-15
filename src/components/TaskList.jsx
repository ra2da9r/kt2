import { useState, useContext } from 'react'
import { AppContext } from '../context/ThemeContext'

export function TaskList({ tasks, onDeleteTask, onUpdateTaskStatus }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [priorityFilter, setPriorityFilter] = useState('')

    const filteredTasks = tasks.filter(task => {
        return (
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (statusFilter === '' || task.status === statusFilter) &&
        (priorityFilter === '' || task.priority === priorityFilter)
        )
    })

    const { styles } = useContext(AppContext)

    return (
        <div style={ styles }>
            <div>
        <input
            type="text"
            placeholder="Поиск по названию"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>
        <div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Все статусы</option>
            <option value="new">Новая</option>
            <option value="in_progress">В работе</option>
            <option value="completed">Выполнена</option>
        </select>
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="">Все приоритеты</option>
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
        </select>
        </div>
        <button onClick={() => {
            setSearchQuery('')
            setStatusFilter('')
            setPriorityFilter('')
        }}>
            Сбросить фильтры
        </button>
        {filteredTasks.length > 0 ? (
            <ul>
            {filteredTasks.map((task, index) => (
                <li key={index}>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>Приоритет: {task.priority}</p>
                <p>Статус: {
                    task.status === 'new' ? 'Новая' :
                    task.status === 'in_progress' ? 'В работе' : 'Выполнена'
                }</p>
                <button style={{ marginRight: '5px' }} onClick={() => onUpdateTaskStatus(task, 'new')}>
                    Новая
                </button>
                <button style={{ marginRight: '5px' }} onClick={() => onUpdateTaskStatus(task, 'in_progress')}>
                    В работе
                </button>
                <button style={{ marginRight: '5px' }} onClick={() => onUpdateTaskStatus(task, 'completed')}>
                    Выполнено
                </button>
                <button style={{ marginRight: '5px' }} onClick={() => onDeleteTask(task)}>
                    Удалить
                </button>
                </li>
            ))}
            </ul>
        ) : (
            <p>{tasks.length === 0 ? 'Задач пока нет.' : 'Задачи не найдены.'}</p>
        )}
        </div>
  )
}
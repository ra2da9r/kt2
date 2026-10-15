import './App.css'
import { AppProvider } from './context/ThemeContext'
import { TaskFlow } from './context/TaskFlow.jsx'


function App() {
  return (
    <AppProvider>
      <TaskFlow />
    </AppProvider>
  )
} 
  
export default App

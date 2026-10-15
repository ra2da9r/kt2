import { createContext, useState, useContext } from 'react'

const AppContext = createContext()

function AppProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [actionCount, setActionCount] = useState(0)

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    setActionCount((prevCount) => prevCount + 1)
  }
  const backgroundColor = theme === 'light' ? '#fff' : '#16171d'
  const color = theme === 'light' ? '#000' : '#fff'
  const styles = {
    backgroundColor,
    color,
    colorScheme: theme,
    '--bg': backgroundColor,
    '--text': color,
    '--text-h': color,
  }

  return (
    <AppContext.Provider value={{ theme, toggleTheme, actionCount, styles }}>
      {children}
    </AppContext.Provider>
  )
} 
function ToggleThemeButton() {
  const { theme, toggleTheme } = useContext(AppContext)

  return (
    <button onClick={toggleTheme}>
      Переключить тему (текущая: {theme})
    </button>
  )
}

export { AppContext, AppProvider, ToggleThemeButton }
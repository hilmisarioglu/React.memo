import React from 'react'

const MyContext = React.createContext();
const MyProvider = ({children}) => {
  const [theme,setTheme] = React.useState('light')
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  const value = {
    theme,
    nextTheme,
    toggleTheme : () => {
      setTheme(nextTheme)
    }
  }
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  )
}

const App = () => {

  return (
    <MyProvider>
      <DirectChild/>
    </MyProvider>
  )
}

const DirectChild = React.memo(() => {
  console.log('DirectChild')
  return (
    <nav>
      <DeeperChild/>
    </nav>
  )
})

const DeeperChild = () => {
  console.log('DeeperChild')
  const {nextTheme, toggleTheme} = React.useContext(MyContext)
  return (
    <p>Open Console, just DeeperChild rendered, DirectChild doesn't rendered <button onClick={toggleTheme}>{nextTheme}</button></p>
  )
}
export default App

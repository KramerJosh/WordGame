import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LetterBox from './components/LetterBox'
import LetterRow from './components/LetterRow'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LetterRow />
    </>
  )
}

export default App

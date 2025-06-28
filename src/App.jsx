import './App.css'
import Navbar from './Components/Navbar'
import BackgroundGlow from './BackgroundGlow'
import DivBackground from './Components/divBackground'
import Manager from './Components/Manager'
import Database from './Components/Database'
import { useState } from 'react'
import { set } from 'mongoose'
// If using Tailwind CSS, ensure it's imported in your main entry file (e.g., main.jsx or index.js)

function App() {

  const [button, setbutton] = useState(false)

  const handleButton = () => {
    console.log('Hi')
    setbutton(prev => !prev)
  }
  // handleButton is being passed to Manager as sendTrigger prop

  return (
    <BackgroundGlow>
      <div className="App relative p-none m-none h-screen w-screen">
        <Navbar />
        <DivBackground>
          <Manager sendTrigger={handleButton} />
          <Database button={button}/>
        </DivBackground>
      </div>
    </BackgroundGlow>
  )
}
export default App

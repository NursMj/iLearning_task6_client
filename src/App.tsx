import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import UserPage from './pages/UserPage'
import Header from './components/Header'



function App() {
  const [isLogedIn, setIsLogedIn] = useState(false)

  return (
    <BrowserRouter>
      <Header isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn}/>
      <Routes>
        <Route path='/user' element={<UserPage />}/>
        <Route path="/" element={<WelcomePage setIsLogedIn={setIsLogedIn} />} />
        <Route path='*' element={<Navigate to='/'/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

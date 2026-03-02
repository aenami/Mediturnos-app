import './App.css'
import { useEffect } from 'react'

function App() {
   useEffect( () => {
    fetch("http://localhost:3000/")
      .then(res => res.json())
      .then(data => console.log(data))
  }, [])
  
  // HOOK USE EFFECT QUE HAGA UN FETCH AL BACKEND
  return (
    <>
      <h1>HOLA MUNDO</h1>
    </>
  )
}

export default App

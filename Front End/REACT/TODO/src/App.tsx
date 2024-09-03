import { useRef, useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    const newTodo = inputRef.current?.value
    if (newTodo) { // Check if there's a new todo to add
      setTodos([...todos, newTodo])
      inputRef.current.value = '' // Clear the input field after adding
    }
  }

  return (
    <>
      <h1>TODO</h1>
      <h2>Add your todos</h2>
      <input 
        type="text"
        placeholder='Enter your todo'
        ref={inputRef}
      />
      <button onClick={handleClick}>ADD</button>
      <ol>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
          </li>
        ))}
      </ol>
    </>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
// root div is the root of the react app in the actual DOM ie its a way to access the real DOM 
// App component is the parent component of all components and is the root component of the react DOM
// root.render is the way to render the react app in the real DOM ie making App (VDOM)== root(real DOM)

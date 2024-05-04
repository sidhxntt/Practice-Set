import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
]);
// CREATE REACT DOM STARTING WITH ROOT DIV IN HTML AND RENDERING THE APP COMPONENT IN THE ROOT DIV
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)

// root div is the root of the react app in the actual DOM ie its a way to access the real DOM 
// App component is the parent component of all components and is the root component of the react DOM ie VDOM
// root.render is the way to render the react app in the real DOM ie making App (VDOM)== root(real DOM)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Home from './Components/Home.jsx'
import About from './Components/About.jsx'
import Contact from './Components/Contacts.jsx'
import User from './Components/User.jsx'
import ErrorPage from "../src/error_page.jsx";

//Anything nested inside is changed by using outlet 
const router =createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    errorElement: <ErrorPage />,
    children:[
      {
      path: '',
      element: <Home/>
    },
    {
      path: 'about',
      element: <About/>
    },
    {
      path: 'contact',
      element: <Contact/>
    },
    {
      path: 'user/:id',
      element: <User/>
    },
  ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


//Loaders are used to load data before a component is rendered and useEffect loads the component first and the data comes after.
//links can only change the URL while forms can also change the request method (GET vs POST) and the request body (POST form data).
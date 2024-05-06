//app.jsx ==Layout of the page
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Components/header'
import Footer from './Components/footer'

const Layout = () => {
  return (
    <>
    <Header/>
    {/* Outlet works like a placeholder for children elements to dynamically render acc to the url  */}
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout
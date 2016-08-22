import React from 'react'
import Footer from '../components/Footer'
import Nav from '../components/Nav'

const Layout = ({ location, children }) => {
  return (
    <div>
      <Nav location={location} />
      {children}
      <Footer />
    </div>
  )
}

export default Layout

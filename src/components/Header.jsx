import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
        <Link to='/' className='logo'>Our Tech Blogs</Link>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </nav>
    </header>
  )
}

export default Header

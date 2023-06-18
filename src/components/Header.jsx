import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetch('http://localhost:3000/api/v1/auth/profile', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      if (data.username) {
        setUser(data.username)
      }
    })
  }, [])

  const logout = () => {
    fetch('http://localhost:3000/api/v1/auth/logout', {
      credentials: 'include'
    })
  }

  return (
    <header>
        <Link to='/' className='logo'>Our Tech Blogs</Link>
        <nav>
          { user && (
            <>
            <Link to='/create'>Create Blog</Link>
            <Link to='/profile'>Profile</Link>
            <Link onClick={logout}>Logout</Link>
            </>
          )}
          { !user && (
            <>
              <Link to='/'>Home</Link>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
          )}
        </nav>
    </header>
  )
}

export default Header

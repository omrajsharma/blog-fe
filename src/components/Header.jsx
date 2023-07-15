import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

function Header() {
  const {userInfo, setUserInfo} = React.useContext(UserContext);

  React.useEffect(() => {
    fetch('https://fine-blue-shrimp-coat.cyclic.app/api/v1/auth/profile', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      setUserInfo(data)
    })
  }, [])

  const logout = () => {
    fetch('https://fine-blue-shrimp-coat.cyclic.app/api/v1/auth/logout', {
      credentials: 'include'
    })
    setUserInfo({})
  }

  return (
    <header>
        <Link to='/' className='logo'>Our Tech Blogs</Link>
        <nav>
          { userInfo?.username && (
            <>
            <Link to='/create'>Create Blog</Link>
            <Link to='/profile'>Profile</Link>
            <Link onClick={logout}>Logout</Link>
            </>
          )}
          { !userInfo?.username && (
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

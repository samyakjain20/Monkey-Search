import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container navContainer">
        <Link to="/">
          <div className="d-flex text-white">
            <img src="monkey2.png" style={{height: "50px", width: "50px"}} />
            <h1 className="appName text-black">MonkeySearch</h1>
          </div>
        </Link>
        <nav className='text-white'>
          {user && (
            <div>
              <span>{user.email}</span>
              <Link to="/top-250"><strong>Top 250</strong></Link>
              <Link to="/news"><strong>News</strong></Link>
              { user.role == "admin" && <Link to="/admin-dashboard"><strong>Dashboard</strong></Link>}
              <Link to="/"><strong>Home</strong></Link>
              <button className='border border-dark text-dark' onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login"><button className='btn btn-success px-4'>Login</button></Link>
              <Link to="/signup"><button className='btn btn-danger px-4'>Signup</button></Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
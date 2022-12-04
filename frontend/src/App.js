import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Top250 from './pages/Top250'
import News from './pages/News'
import Admin from './pages/Admin'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/top-250" 
              element={user ? <Top250 /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/news" 
              element={user ? <News /> : <Navigate to="/news" />} 
            />
            <Route 
              path="/admin-dashboard" 
              element={user && user.role == "admin" ? <Admin /> : <Navigate to="/admin-dashboard" />} 
            />
            <Route 
              path="/admin-dashboard" 
              element={user && user.role != "admin" ? <Admin /> : <Navigate to="/" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

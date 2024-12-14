import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">File Manager</h1>
          </div>

          <div className="lg:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="p-2 rounded-md text-white hover:bg-indigo-500 focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="hidden lg:flex space-x-4 items-center">
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-white text-indigo-600' : 'hover:bg-indigo-500'
                }`
              }
            >
              Upload File
            </NavLink>
            <NavLink
              to="/files"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-white text-indigo-600' : 'hover:bg-indigo-500'
                }`
              }
            >
              My Files
            </NavLink>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-2 space-y-2">
            <NavLink
              to="/upload"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-white text-indigo-600' : 'hover:bg-indigo-500'
                }`
              }
            >
              Upload File
            </NavLink>
            <NavLink
              to="/files"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-white text-indigo-600' : 'hover:bg-indigo-500'
                }`
              }
            >
              My Files
            </NavLink>
            <button
              type="button"
              onClick={() => {
                handleLogout()
                setIsOpen(false)
              }}
              className="block w-full text-left px-4 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

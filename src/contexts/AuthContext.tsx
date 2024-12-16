import type React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { loginUser } from '@/services/auth/login'
import { AuthContext, type User } from '@/hooks/use-auth'
import { registerUser } from '@/services/auth/register'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
    }

    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)

      const response = await loginUser({ email, password })

      const user = {
        id: response.user.id,
        email: response.user.email,
      }
      const token = response.token

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)

      toast.success({
        title: 'Login successful',
        description: 'Welcome back!',
      })

      navigate('/files')
    } catch (error) {
      toast.error({
        title: 'Error',
        description: error.message || 'Invalid email or password.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      setIsLoading(true)

      await registerUser({ email, password, confirmPassword })

      toast.success({
        title: 'Register successful',
      })

      navigate('/login')
    } catch (error) {
      toast.error({
        title: 'Error',
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')

    toast.success({
      title: 'Logged out',
      description: 'Come back soon!',
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

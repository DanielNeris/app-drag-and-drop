import { useAuth } from '@/hooks/use-auth'
import { Navigate } from 'react-router-dom'
import Navbar from './Navbar'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <Navbar />
      <div className="p-4">{children}</div>
    </>
  )
}

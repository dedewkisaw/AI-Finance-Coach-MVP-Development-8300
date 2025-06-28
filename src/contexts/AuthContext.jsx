import React, {createContext, useContext, useState, useEffect} from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for stored auth data
    const storedUserId = localStorage.getItem('userId')
    const storedEmail = localStorage.getItem('userEmail')
    
    if (storedUserId && storedEmail) {
      setUser({
        id: storedUserId,
        email: storedEmail
      })
      setIsAuthenticated(true)
      setUserProfile({
        id: storedUserId,
        email: storedEmail,
        subscription_status: 'free'
      })
    }
    
    setLoading(false)
  }, [])

  const signUp = async (email, password, fullName) => {
    try {
      const mockUser = {
        id: 'demo-user-' + Date.now(),
        email: email
      }
      
      localStorage.setItem('userId', mockUser.id)
      localStorage.setItem('userEmail', mockUser.email)
      
      setUser(mockUser)
      setIsAuthenticated(true)
      setUserProfile({
        id: mockUser.id,
        email: mockUser.email,
        full_name: fullName,
        subscription_status: 'free'
      })
      
      return {user: mockUser, session: {user: mockUser}}
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  }

  const signIn = async (email, password) => {
    try {
      const mockUser = {
        id: 'demo-user-' + Date.now(),
        email: email
      }
      
      localStorage.setItem('userId', mockUser.id)
      localStorage.setItem('userEmail', mockUser.email)
      
      setUser(mockUser)
      setIsAuthenticated(true)
      setUserProfile({
        id: mockUser.id,
        email: mockUser.email,
        subscription_status: 'free'
      })
      
      return {user: mockUser, session: {user: mockUser}}
    } catch (error) {
      console.error('Signin error:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      localStorage.removeItem('userId')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('token')
      
      setUser(null)
      setUserProfile(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Signout error:', error)
      throw error
    }
  }

  const updateProfile = async (updates) => {
    try {
      if (!user) throw new Error('No user logged in')
      
      const updatedProfile = {...userProfile, ...updates}
      setUserProfile(updatedProfile)
      return updatedProfile
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  const value = {
    user,
    userProfile,
    isAuthenticated,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    setIsAuthenticated, // Export this for direct setting
    // For compatibility with existing code
    login: signIn,
    signup: signUp,
    logout: signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
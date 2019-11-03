import React, { useState } from 'react'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext

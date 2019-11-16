import React, { useState } from 'react'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [allWords, setAllWords] = useState([])
  const [curUser, setCurUser] = useState({})
  const [friends, setFriends] = useState({})
  return (
    <UserContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        allWords,
        setAllWords,
        curUser,
        setCurUser,
        friends,
        setFriends,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext

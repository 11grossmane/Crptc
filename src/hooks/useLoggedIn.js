import React, { useState } from 'react'

export default () => {
  const [loggedIn, setLoggedIn] = useState(false)
  return { loggedIn, setLoggedIn }
}

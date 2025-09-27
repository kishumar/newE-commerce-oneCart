import React, { createContext } from 'react'


export const AuthDataContext = createContext()
function AuthContext({children}) {

  let serverUrl = "https://newe-commerce-onecart.onrender.com"


    let value = {
        serverUrl
    }
  return (


    <div>
        <AuthDataContext.Provider value={value}>
            {children}
        </AuthDataContext.Provider>
    </div>
  )
}

export default AuthContext

import { createContext, useState } from "react";

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    //id:'660d90a97235d684f66c3464', token:'1', role:'user'

    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
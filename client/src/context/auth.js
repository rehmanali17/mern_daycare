import { createContext } from "react";


export const AuthContext = createContext()

const AuthContextProvider = (props)=>{

    const setToken = (token)=>{
        localStorage.setItem('token', token)
    }

    const getToken = ()=>{
        // if(localStorage.getItem(''))
        let token = localStorage.getItem('token')
        return token
    }

    return(
        <AuthContext.Provider value={{setToken, getToken}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
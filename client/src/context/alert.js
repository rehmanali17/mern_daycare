import { createContext, useReducer } from "react";
import { alertReducer } from "../reducer/alert";
export const AlertContext = createContext()

const AlertContextProvider = (props)=>{
    const [alerts, dispatch] = useReducer(alertReducer,[])


    return (
        <AlertContext.Provider value={{alerts, dispatch}}>
            {props.children}
        </AlertContext.Provider>
    )

}

export default AlertContextProvider
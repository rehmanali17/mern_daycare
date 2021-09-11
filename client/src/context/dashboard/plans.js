import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState} from "react";
import {AuthContext} from '../../context/auth'
import { plansReducer } from "../../reducer/plans";
export const PlansContext = createContext()

const PlansContextProvider = ({children})=>{
    const { getToken } = useContext(AuthContext)
    const token = getToken()
    let [userPlans , dispatchPlan ] = useReducer(plansReducer,[])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        const getPlans = async ()=>{
            const config = {
                headers: {
                    'x-auth-token': token
                        }
            }
            let response = await axios.get("http://localhost:5000/user/",config)
            dispatchPlan({type: 'ADD_PLAN', payload :response.data.plans}
            )
            setIsLoading(false)                      
        }
        getPlans()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <PlansContext.Provider value={{userPlans, dispatchPlan, isLoading}}>
            {children}
        </PlansContext.Provider>
    )
}

export default PlansContextProvider
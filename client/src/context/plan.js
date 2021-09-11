import axios from 'axios'
import { createContext, useEffect, useState } from 'react';

export const planContext = createContext()

const PlanContextProvider = (props)=>{
    const [ plans, setPlans ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    
    useEffect(()=>{
        const getPlans = async()=>{
            const response = await axios.get("http://localhost:5000/")
            setPlans(response.data.plans)
            setIsLoading(false)
        }
        getPlans()
    },[])
    return (
        <planContext.Provider value={{plans, isLoading}}>
            {props.children}
        </planContext.Provider>
    )
    
}

export default PlanContextProvider

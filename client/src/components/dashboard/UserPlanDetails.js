import React, {Fragment, useContext, useEffect, useState} from 'react'
import { Redirect, useHistory } from 'react-router'
import image from '../../images/day-care1.jpg'
import axios from 'axios'
import { AuthContext } from '../../context/auth'
import Navbar from './Navbar'

const UserPlanDetails = (props) => {
    const history = useHistory()
    let url = props.location.state.url
    let isLogged = true
    const {getToken} = useContext(AuthContext)
    let token = getToken()
    if(token === null){
        return <Redirect to="/" />
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [plan, setPlan ] = useState({})

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        const getPlan = async()=>{
            const config = {
                headers: {
                    'x-auth-token': token
                }
            }
            let response = await axios.get(url,config)
            setPlan(response.data)
        }
        getPlan()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

        
    return Object.keys(plan).length === 0 ? (
        <Fragment>
                <div className='custom-spinner'></div>               
            </Fragment> 
    ) : (
        <Fragment>
            <Navbar />
            <h1 className="text-center mb-3 mt-4 display1 text-primary">Plan</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-6 mb-5 mx-sm-auto  mx-5 d-flex align-items-stretch">
                        <div className="card">
                            <img src={image} className="card-img-top" alt="Day Care" />
                            <div className="card-body">
                                <h5 className="card-title">{plan.plan.title}</h5>
                                <p className="card-text">Day Care Plan</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Trial Period: {plan.plan.trial_period}</li>
                                <li className="list-group-item">Duration: {plan.plan.duration}</li>
                                <li className="list-group-item">Time Duration: {plan.plan.time_duration}</li>
                                <li className="list-group-item">Price: {plan.plan.price}$</li>
                                <li className="list-group-item">Time Slot: {plan.time}</li>
                                {/* {isLogged && <li className="list-group-item">Time Slot: {plan.time}</li> } */}
                                {isLogged ? <li className="list-group-item">True: {plan.time}</li> : <li className="list-group-item">False: {plan.time}</li>}
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center mb-4">
                        <p className="custom-click" onClick={()=>{history.goBack()}}>Back to Home</p>
                    </div>       
                </div>
            </div>
        </Fragment>
    )
}

export default UserPlanDetails

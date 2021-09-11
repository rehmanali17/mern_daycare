import React, { Fragment, useState, useContext } from 'react'
import { useParams, Redirect, useHistory } from 'react-router'
import { useEffect } from 'react/cjs/react.development'
import axios from 'axios'
import { AuthContext } from '../../context/auth'
import image from '../../images/day-care1.jpg'
import Navbar from './Navbar'
import {v4 as uuid} from 'uuid'
import { AlertContext } from '../../context/alert'
import { PlansContext } from '../../context/dashboard/plans'

const BuyPlan = () => {
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()
    const { id } = useParams()
    let planID = id
    const {dispatch} = useContext(AlertContext)
    const {dispatchPlan} = useContext(PlansContext)
    const [time, setTime] = useState('09:00 AM')
    const [plan , setPlan ] = useState({})
    const {getToken} = useContext(AuthContext)
    let token = getToken()
    if(token === null){
        return <Redirect to="/login" />
    }

    const handleChange = (e)=>{
        setTime(e.target.value)
    }

    const handleSubmit = async (e)=>{
        setLoading(true)
        e.preventDefault()
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            }
            let data = {
                time
            }
            data = JSON.stringify(data)
            let response = await axios.post(`http://localhost:5000/user/buy_plan/${planID}`,data,config)
            
            let id = uuid()
            dispatch({type: 'SET_ALERT', payload : { message: response.data.msg, alertType: 'success', id }})
            setTimeout(()=>{
                dispatch({type: 'REMOVE_ALERT', payload : {id} })
            },5000) 
            dispatchPlan({type: 'ADD_PLAN', payload : [response.data.plan]})
            setLoading(false)
            history.push('/user')
        }catch(error){
            setLoading(false)
            error.response.data.forEach(item => {
                let id = uuid()
                dispatch({type: 'SET_ALERT', payload : { message: item.msg, alertType: 'danger', id }})
                setTimeout(()=>{
                    dispatch({type: 'REMOVE_ALERT', payload : {id} })
                },5000) 
            })
        }

    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        const getPlan = async ()=>{
            const config = {
                headers: {
                    'x-auth-token': token
                }
            }
            let response = await axios.get(`http://localhost:5000/user/buy_plan/${id}`,config)
            setPlan(response.data)
            setIsLoading(false)
        }
        getPlan()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return isLoading === true ? (
        <Fragment>
                <Navbar />
                <div className='custom-spinner'></div>
        </Fragment>
    ) : (
        <Fragment>
            <Navbar />
            {loading === true && 
                <Fragment>
                    <div id="modal-box" className="modal-box">
                        <div id="modal" className="modal custom-spinner">
                        </div>
                    </div>
                </Fragment>
            }
             <h1 className="text-center mb-md-3 mb-sm-4 mt-5 display1 text-primary">Buy Plan</h1>
            <div className="container">
                <form method="post" onSubmit={handleSubmit} >
                    <div className="row">
                        <input type="hidden" name="id" value="<%= id %> " />
                        <div className="col-md-6 col-sm-6 mb-5 mx-sm-auto  mx-5 d-flex align-items-stretch">
                            <div className="card">
                                <img src={image} className="card-img-top" alt="Day Care" />
                                <div className="card-body">
                                    <h5 className="card-title">{plan.title}</h5>
                                    <p className="card-text">Day Care Plan</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Trial Period: {plan.trial_period}</li>
                                    <li className="list-group-item">Duration: {plan.duration}</li>
                                    <li className="list-group-item">Time Duration: {plan.time_duration}</li>
                                    <li className="list-group-item">Price: {plan.price}$</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 mx-sm-auto">
                            <label className="col-sm-4 col-form-label">Pick a Time Slot</label>
                            <div className="col-sm-12 mb-4">
                                <select value={time} className="form-control" onChange={handleChange}>
                                    <option value="09:00 AM">09:00 AM</option>
                                    <option value="12:00 PM">12:00 PM</option>
                                    <option value="14:30 PM">14:30 PM</option>
                                    <option value="18:30 PM">18:30 PM</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="text-center col-sm-4 mx-auto mb-5">
                            <button type="submit" className="btn btn-outline-primary" name="buy-button" id="buy-button">Buy</button>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default BuyPlan

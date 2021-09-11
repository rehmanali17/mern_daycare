import React, {Fragment, useContext, useState} from "react";
import { patterns, validate } from "../validations/validations";
import axios from "axios";
import { AlertContext } from "../context/alert";
import {v4 as uuid} from 'uuid'
import Navbar from '../components/Navbar'

const Contact = ()=>{
    const [loading, setLoading] = useState(false)
    const {alerts, dispatch} = useContext(AlertContext)
    const [formData, setFormData] = useState({
        email:'',
        phone:'',
        address: '',
        message: ''
    })

    const { email, phone, address, message } = formData

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const inputs = document.querySelectorAll('input');

    inputs.forEach((input) => {
        input.addEventListener('keyup',(e)=>{
            validate(e.target, patterns[e.target.name])
        })
    })

    const handleSubmit = async (e)=>{
        setLoading(true)
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let data = JSON.stringify(formData)
        try{
           let response = await axios.post('http://localhost:5000/contact',data,config)
           setLoading(false)
           let id = uuid()
            dispatch({type: 'SET_ALERT', payload : { message: response.data[0].message, alertType: 'success' , id }})
            setTimeout(()=>{
                dispatch({type: 'REMOVE_ALERT', payload : {id} })
            },5000)
        }catch(error){
            setLoading(false)
            let id = uuid()
            dispatch({type: 'SET_ALERT', payload : { message: error.data[0].message, alertType: 'danger' , id }})
            setTimeout(()=>{
                dispatch({type: 'REMOVE_ALERT', payload : {id} })
            },5000)
        }
    }

    return(
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
            <div className="container mt-4">
                <h1 className="text-center text-primary mb-4">Contact Us</h1>
                <form className="row g-3" onSubmit={handleSubmit}>
                {alerts.map(alert => {
                    return (
                        <p key={alert.id} className={`alert alert-${alert.alertType} text-center w-100 p-2 mb-3`}>{alert.message}</p>
                    )
                })}
                <div className="col-md-6 mb-4">
                    <input type="email" className="form-control" name="email" placeholder="Email" value={email} onChange={handleChange}/>
                    <p>Email should be valid: me@gmail.com</p>
                </div>
                <div className="col-md-6 mb-4">
                    <input type="text" className="form-control" name="phone" placeholder="Phone" value={phone} onChange={handleChange} />
                    <p>Enter 11 digits phone number</p>
                </div>
                <div className="col-12 mb-4">
                    <input type="text" className="form-control" name="address" placeholder="1234 Main St" value={address} onChange={handleChange} />
                    <p>Enter a valid Address</p>
                </div>
                <div className="col-12 mb-4">
                    <textarea rows="5" type="text" className="form-control" name="message" onChange={handleChange} value={message}>{message}</textarea>
                </div>
                <div className="text-center mx-auto mb-sm-0 mb-3 mt-5">
                    <button type="submit" name="save-button" className="btn btn-primary">Send</button>
                </div>
                </form>
                </div>
        </Fragment>
    );
}

export default Contact
// import React, { Fragment, useState, useEffect, useContext } from 'react'
// import { AuthContext } from '../../context/auth'
// import axios from 'axios'
// import { Redirect } from 'react-router'
// import Navbar from './Navbar'
// import {v4 as uuid} from 'uuid'
// import { AlertContext } from '../../context/alert'
// import { patterns, validate } from '../../validations/validations'

// const UpdateProfile = () => {
//     const [loading, setLoading] = useState(false)
//     const {alerts,dispatch} = useContext(AlertContext)
//     const {getToken} = useContext(AuthContext)
//     let token = getToken()

//     const [file, setFile] = useState(null)

//     if(token === null){
//         return <Redirect to="/" />
//     }
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const [formData, setFormData] = useState({
//         name: '',
//         password:'',
//         address: '',
//         phone: ''
//     })

//     const { name, password , address, phone } = formData
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     useEffect(()=>{
//         const getUserDetails = async ()=>{
//             const config = {
//                 headers: {
//                     'x-auth-token': token
//                     }
//             }
//             let response = await axios.get("http://localhost:5000/user/user_details",config)
//             setFormData({
//                 ...formData,
//                 name: response.data.name,
//                 address: response.data.address,
//                 phone: response.data.phone,
//             })
//         }
//         getUserDetails()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     },[])

//     const handleChange = (e)=>{
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         })
//     }

//     const handleFileChange = (e)=>{
//         setFile(e.target.files[0])
//     }

//     const inputs = document.querySelectorAll('input');

//     inputs.forEach((input) => {
//         input.addEventListener('keyup',(e)=>{
//             validate(e.target, patterns[e.target.name])
//         })
//     })

//     const handleSubmit = async (e)=>{
//         setLoading(true)
//         e.preventDefault();
//         try{
//             const fd = new FormData()
//             fd.append('userImage',file)
//             fd.append('name',formData.name)
//             fd.append('address',formData.address)
//             fd.append('phone',formData.phone)
//             fd.append('password',formData.password)
//             const config = {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'x-auth-token': token
//                 }
//             }
//             let response = await axios.put("http://localhost:5000/user/update_profile", fd, config)
//             setLoading(false)
//             let id = uuid()
//             dispatch({type: 'SET_ALERT', payload : { message: response.data.msg, alertType: 'success', id }})
//             setTimeout(()=>{
//                 dispatch({type: 'REMOVE_ALERT', payload : {id} })
//             },5000) 
//         }catch(error){
//             setLoading(false)
//             error.response.data.forEach(item => {
//                 let id = uuid()
//                 dispatch({type: 'SET_ALERT', payload : { message: item.msg, alertType: 'danger', id }})
//                 setTimeout(()=>{
//                     dispatch({type: 'REMOVE_ALERT', payload : {id} })
//                 },5000) 
//             })
//         }
//     }

//     return formData.name === "" ? (
//             <Fragment>
//                 <Navbar />
//                 <div className='custom-spinner'></div>
//             </Fragment>
//     ) : (
//         <Fragment>
//             <Navbar />
//             {loading === true && 
//                 <Fragment>
//                     <div id="modal-box" className="modal-box">
//                         <div id="modal" className="modal custom-spinner">
//                         </div>
//                     </div>
//                 </Fragment>
//             }
//             <h1 className="text-center  mb-4 mt-5 display1 text-primary">Update Profile</h1>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-lg-6 m-lg-auto col-md-8 m-md-auto col-sm-10 m-sm-auto">
//                         {alerts.map(alert => {
//                             return(
//                                 <p key={alert.id} className={`text-center alert alert-${alert.alertType} text-center w-100 p-2 mb-3`}>{alert.message}</p>
//                             )
//                         })}
//                         <form method="post"  encType="multipart/form-data" onSubmit={handleSubmit} >
//                             <div className="mb-4">
//                                 <input type="text" className="form-control" name="name" placeholder="Name" value={name} onChange={handleChange} />
//                                 <p>Name should be valid</p>
//                             </div>
//                             <div className="mb-4">
//                                 <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={handleChange} />
//                                 <p>Password should be atleast 6 digits alphanumeric</p>
//                             </div>
//                             <div className="mb-4">
//                                 <input type="text" className="form-control" name="address" placeholder="Address" value={address} onChange={handleChange} />
//                                 <p>Enter a valid Address</p>
//                             </div>
//                             <div className="mb-4">
//                                 <input type="text" className="form-control" name="phone" placeholder="Phone" value={phone} onChange={handleChange} />
//                                 <p>Enter 11 digits phone number</p>
//                             </div>
//                             <div className="mb-3">
//                             <input type="file" className="form-control" name="profile-pic" onChange={handleFileChange} />
//                             </div> 
//                             <div className="row">
//                                 <div className="col-sm-2 col-3 ml-auto mr-auto mb-5 mt-3">
//                                     <input className="btn btn-primary" type="submit" name="save-button" value="Update" />
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </Fragment>
//     )
// }

// export default UpdateProfile

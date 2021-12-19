// import React, {Fragment, useContext, useState} from 'react'
// import { Link } from 'react-router-dom'
// import {patterns, validate} from '../../validations/validations'
// import {v4 as uuid} from 'uuid'
// import { AuthContext } from '../../context/auth'
// import axios from 'axios'
// import { AlertContext } from '../../context/alert'
// import { useHistory, Redirect } from 'react-router'
// import Navbar from '../Navbar'
// const Login = () => {
//     const [loading, setLoading] = useState(false)
//     const history = useHistory()
//     const { setToken, getToken } = useContext(AuthContext)
//     const { alerts, dispatch } = useContext(AlertContext)
//     const [formData, setFormData] = useState({
//         email:'',
//         password:'',
//     })
//     let token = getToken()
//     if(token !== null){
//         return <Redirect to="/user" />
//     }

//     const { email, password } = formData

//     const handleChange = (e)=>{
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         })
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
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }
//             let data = JSON.stringify(formData)
//             let response = await axios.post("http://localhost:5000/auth/login", data, config)
//             setLoading(false)
//             setToken(response.data.token)
//             history.push('/user')
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

//     // const OAuth = async (type)=>{
//     //         try{
//     //             let response = await axios.get(`http://localhost:5000/auth/${type}`)
//     //             setToken(response.data.token)
//     //         }catch(error){
//     //             error.response.data.forEach(item => {
//     //                 let id = uuid()
//     //                 dispatch({type: 'SET_ALERT', payload : { message: item.msg, alertType: 'danger', id }})
//     //             })
//     //         }
//     // }


//     return (
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
//             <h1 className="text-center  mb-4 mt-5 display1 text-primary">Log In</h1>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-lg-6 m-lg-auto col-md-8 m-md-auto col-sm-10 m-sm-auto">
//                     {alerts.map(alert => {
//                     return (
//                         <p key={alert.id} className={`alert alert-${alert.alertType} text-center w-100 p-2 mb-3`} >{alert.message}</p>
//                         )
//                     })}
//                         <form method="post"  onSubmit={handleSubmit} >
//                             <div className="mb-4">
//                                 <input type="email" className="form-control" name="email" placeholder="Email" value={email} onChange={handleChange} />
//                                 <p>Email should be valid: me@gmail.com</p>
//                             </div>
//                             <div className="mb-4">
//                                 <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={handleChange} />
//                                 <p>Password should be atleast 6 digits alphanumeric</p>
//                             </div>
//                             Don't have an account? <Link to="/register">Register</Link>
//                             <div className="row">
//                                 <div className="col-sm-2 col-3 ml-auto mr-auto mb-5 mt-3">
//                                     <input className="btn btn-primary" type="submit" name="save-button" value="Login" />
//                                 </div>
//                             </div>
//                         </form>
//                         {/* <div className="row">
//                                 <div className="col text-center mb-3">
//                                     <button onClick={()=>{ OAuth('google') }} className="btn btn-outline-danger"  >Login with Google+</button>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col text-center mb-3">
//                                     <button onClick={()=>{ OAuth('facebook') }} className="btn btn-outline-primary" >Login with Facebook</button>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col text-center">
//                                     <button onClick={()=>{ OAuth('github') }} className="btn btn-outline-dark" >Login with GitHub</button>
//                                 </div>
//                             </div> */}
//                     </div>
//                 </div>
//             </div>
//         </Fragment>
//     )
// }

// export default Login

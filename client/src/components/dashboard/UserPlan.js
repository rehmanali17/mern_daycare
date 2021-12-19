// import React, { Fragment, useContext, useState } from 'react'
// import { AlertContext } from '../../context/alert'
// import { PlansContext } from '../../context/dashboard/plans'
// import axios from 'axios'
// import {v4 as uuid} from 'uuid'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEye } from '@fortawesome/free-solid-svg-icons'
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// import { useHistory } from 'react-router'

// const UserPlan = ({plans, token}) => {
//     const [loading, setLoading] = useState(false)
//     const { alerts, dispatch } = useContext(AlertContext)
//     const { dispatchPlan } = useContext(PlansContext)
//     const history = useHistory();

//     const deletePlan = async (id,url)=>{
//         setLoading(true)
//         let planID = id
//         let planURL = url
//         console.log(planURL)
//         try {
//             const config = {
//                 headers: {
//                     'x-auth-token': token
//                         }
//             } 
//            let response = await axios.delete(planURL,config)
//            setLoading(false)
//            let id = uuid()
//             dispatch({type: 'SET_ALERT', payload : { message: response.data[0].message, alertType: 'success', id }})
//             setTimeout(()=>{
//                 dispatch({type: 'REMOVE_ALERT', payload : {id} })
//             },5000)
//             dispatchPlan({type: 'REMOVE_PLAN', payload : { id:planID }})
//         } catch (error) {
//             setLoading(false)
//             let id = uuid()
//             dispatch({type: 'SET_ALERT', payload : { message: error.response.data[0].message, alertType: 'danger', id }}) 
//             setTimeout(()=>{
//                 dispatch({type: 'REMOVE_ALERT', payload : {id} })
//             },5000)  
//         }
//     }


//     return (
//         <Fragment>
//             {loading === true && 
//                 <Fragment>
//                     <div id="modal-box" className="modal-box">
//                         <div id="modal" className="modal custom-spinner">
//                         </div>
//                     </div>
//                 </Fragment>
//             }
//             <div className="container">
//                 <div className="row">
//                     <div className="col-12">
//                     {alerts.map(alert => {
//                         return (
//                             <p key={alert.id} className={`alert alert-${alert.alertType} text-center w-100 p-2 mt-3`} >{alert.message}</p>
//                             )
//                         })}
//                         <table style={{width : '100%'}}>
//                             <thead>
//                                 <tr style={{textAlign: 'center'}}>
//                                     <th>Count</th>
//                                     <th>Plan</th>
//                                     <th>Time</th>
//                                     <th>View</th>
//                                     <th>Delete</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {plans.map((plan,i) => {
//                                     return(
//                                         <tr key={plan._id} style={{textAlign: 'center'}}>
//                                         <td>{i+1}</td>
//                                         <td>{plan.plan.title}</td>
//                                         <td>{plan.time}</td>
//                                         <td>
//                                             <button onClick={()=>{
//                                                 history.push({
//                                                     pathname: '/user/plan_details',
//                                                     state: { url : plan.request[0].view.url }
//                                                 })
//                                             }} >
//                                                 <FontAwesomeIcon icon={faEye}/>
//                                             </button>
//                                         </td>
//                                         <td>
//                                             <button onClick={() =>{deletePlan(plan._id,plan.request[0].delete.url)} }>
//                                                 <FontAwesomeIcon icon={faTrashAlt}/>
//                                             </button>
//                                         </td>
//                                         </tr>
//                                     )
//                                 })}
                                    
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </Fragment>
//     )
// }

// export default UserPlan

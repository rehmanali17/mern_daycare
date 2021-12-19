import { contactApi } from "../api/api";
import { ADD_ALERT, CONTACT_LOADING, MSG_FAIL, MSG_SUCCESS, REMOVE_ALERT } from "./types";

export const contact = (data) => async (dispatch) => {
    dispatch({type: CONTACT_LOADING, payload: {}})
    try{
           let response = await contactApi(data)
            dispatch({type: ADD_ALERT, payload : { messages: response.data[0].message, alertType: 'success'}})
            dispatch({type: MSG_SUCCESS, payload : response.data[0].contact_message})
            setTimeout(()=>{
                dispatch({type: REMOVE_ALERT , payload : {} })
            },5000)
        }catch(error){
            dispatch({type: ADD_ALERT, payload : { messages:'Error occured while sending the message', alertType: 'danger'}})
            dispatch({type: MSG_FAIL, payload : {}})
            setTimeout(()=>{
                dispatch({type: REMOVE_ALERT , payload : {} })
            },5000)
        }
}
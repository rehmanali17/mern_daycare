import { ADD_ALERT, REMOVE_ALERT } from "../actions/types"

export const alerts = ( state = {
    alerts: [],
    alertType: ''
}, action) => {
    const {payload, type} = action
    switch(type){
        case ADD_ALERT:
            return {
                alertType: payload.alertType,
                alerts: [...state.alerts,payload.messages]
            }
        case REMOVE_ALERT:
            return {
                alertType: '',
                alerts: []
            }
        default:
            return state
    }
}
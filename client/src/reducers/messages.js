import { MSG_SUCCESS, MSG_FAIL, CONTACT_LOADING } from "../actions/types"

export const messages = ( state = {
    isLoading: false,
    error: '',
    messages: []
} , action) => {
    const {payload, type} = action
    switch(type){
        case MSG_SUCCESS:
            return {
                isLoading: false,
                error: '',
                messages: [...state.messages,payload]
            }
        case MSG_FAIL:
            return {
                isLoading: false,
                error: 'Error occured while sending the message',
                messages: state.messages
            }
        case CONTACT_LOADING:
            return {
                isLoading: true,
                error: '',
                messages: state.messages
            }
        default:
            return state
    }
}
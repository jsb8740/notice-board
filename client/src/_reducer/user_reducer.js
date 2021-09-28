import { 
    USER_LOGIN, 
    USER_REGISTER,
    USER_AUTH,
    USER_LOGOUT
} from "../_action/types";

export default function (state={}, action) {
    switch(action.type) {
        case USER_LOGIN:
            return {
                ...state, loginSuccess:action.payload
            }

        case USER_REGISTER:
            return{
                ...state, register:action.payload
            }

        case USER_AUTH:
            return {
                ...state, userdata:action.payload
            }

        case USER_LOGOUT:
            return {
                ...state, logout:action.payload
            }

        default :
            return state;
            
    }
}
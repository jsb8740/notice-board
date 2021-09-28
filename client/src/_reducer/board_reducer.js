import { 
    BOARD_WRITE,
    BOARD_SEARCH,
    BOARD_MODIFY,
    BOARD_DELETE
} from "../_action/types";

export default function (state={}, action) {
    switch(action.type) {
        case BOARD_WRITE:
            return {
                ...state, write:action.payload
            }

        case BOARD_SEARCH:
            return {
                ...state, search:action.payload
            }

        case BOARD_MODIFY: 
            return {
                ...state, modify:action.payload
            }

        case BOARD_DELETE:
            return {
                ...state, delete:action.payload
            }
        default :
            return state;
            
    }
}
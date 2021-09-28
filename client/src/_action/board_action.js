import axios from "axios"
import { 
    BOARD_WRITE,
    BOARD_SEARCH,
    BOARD_MODIFY,
    BOARD_DELETE
} from "./types";

export async function boardWrite(boardData) {
    const fetchData = await axios.post('/api/board/write', boardData)
    
    return {
        type: BOARD_WRITE,
        payload: fetchData.data
    }
}

export async function boardSearch(search_data) {
    const fetchData = await axios.post('/api/board/searchBoard', search_data);

    return {
        type: BOARD_SEARCH,
        payload: fetchData.data
    }
}

export async function boardModify(boardData) {
    const fectchData = await axios.post('/api/board/modify', boardData);

    return {
        type: BOARD_MODIFY,
        payload: fectchData.data
    }
}

export async function boardDelete(boardId) {

    const fectchData = await axios.post('/api/board/delete', boardId);
    return {
        type: BOARD_DELETE,
        payload: fectchData.data
    }
}
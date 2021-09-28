import React, { useEffect } from 'react'
import { withRouter, useLocation, useHistory } from 'react-router'
import { boardDelete } from '../../../_action/board_action';
import { useDispatch } from 'react-redux';

function LoginDeletePage() {
    const location = useLocation();
    const history = useHistory();

    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(boardDelete(location.state))
            .then(response => {
                if(response.payload.deleteSuccess === true) {
                    history.push('/');
                } else {
                    alert('삭제 실패했습니다')
                    history.push(`/board/view/${location.state.boardId}`)
                }
                // console.log(response)
            })
    }, [])
    return (
        <div style={{height:'100vh',mwidth:'100%',display:'flex', alignItems:'center', justifyContent:'center'}}>
            삭제중...
        </div>
    )
}

export default withRouter(LoginDeletePage)

import { withRouter, useLocation, useHistory } from 'react-router'
import React, { useEffect } from 'react'
import { boardDelete } from '../../../_action/board_action';
import { useDispatch } from 'react-redux';

function LogoutDeletePage() {

    const location = useLocation();
    const history = useHistory()

    console.log(location.state.boardId)
    // 버튼을 누르면 
    //일단 로그인 상태 체크하고 
    // 비밀번호 체크 db에 저장된 암호화 비밀번호랑 비교
    // 맞으면 db에서 제거
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

export default withRouter(LogoutDeletePage)

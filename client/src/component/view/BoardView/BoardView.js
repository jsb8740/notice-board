import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, withRouter, useHistory } from 'react-router-dom'
import Board_Body from './Board_Body';
import SearchingBox from '../SearchBoard/SearchingBox';
import { getCookie } from '../Commons/CookieCheck'

function BoardView() {
    const [boardContents, setboardContents] = useState("")

    // useParams으로 url로 보내진 데이터를 가져왔음
    const boardId = useParams();   

    //parmas로 보드 id값을 받아와서
    //여기서 서버로 post으로 보내서 내용 가져오기
    
    useEffect(() => {
        let mounted = true;

        //자꾸 메모리 누수 에러가 생겨서 이렇게 진행함
        //여러번 보드데이터를 가져와서 그런듯
        //이렇게 1번만 딱가져오게만듬
        const fectchBoardData = async () => {
            //console.log(boardId);
            const response = await axios.post('/api/board/getContents', boardId)

            if(mounted){
                setboardContents(response.data)
            }
            // console.log(response.data)
        }
        fectchBoardData();
        return () => (mounted = false);
    }, [])


    const loginCheck = getCookie('userId'); //null이면 로그아웃
    const history = useHistory()
    const onClickLogoutHandler = function (){
        axios.get('/api/users/logout')
        .then(response => {
            if (response.data.success) {
                history.push('/');
            }
            else {
                alert('이미 로그아웃상태입니다')
            }
        })
    }
    const onClickLoginHandler = function () {
        history.push('/login')
    }

    const onClickRegisterHandler = () => {
        history.push('/register')
    }

    return (

        <div>
            <header style={{marginTop:'20px'}}>
            <div className="content">                
                    <div className="empty1"></div>
                        
                    <div style={{display:'flex', flexBasis:'1100px', flexShrink:0}}>
                        {
                            loginCheck === null //로그아웃상태면
                                ? <span>
                                    <button style={{ position: 'relative', left: '950px' }} onClick={onClickLoginHandler}>로그인</button>
                                    <button style={{ position: 'relative', left: '950px' }} onClick={onClickRegisterHandler}>회원가입</button>
                                </span>
                                : <span><button style={{ position: 'relative', left: '1000px' }} onClick={onClickLogoutHandler}>로그아웃</button></span>
                        }
                    </div>
                    <div className="empty1"></div>
                </div>
                
            </header>
            
            {/* main */}
            <Board_Body boardId={boardId} boardData={boardContents}/>

            <footer>
                <SearchingBox/>
            </footer>
        </div>
        
    )
}

export default withRouter(BoardView)

import React, { useEffect, useState } from 'react'
import './CheckPw.css'
import { withRouter, useLocation, useHistory } from 'react-router'
import axios from 'axios';
import {getCookie} from './CookieCheck.js'

function CheckPw() {

    const location = useLocation();
    let boardId;

    const history = useHistory()
    //보드id를 가져와야함
    const [Pw, setPw] = useState("")

    const onPwHandler = (event) => {
        setPw(event.target.value)
    }

    const cancelBtnHandler = (event) => {
        event.preventDefault();
        history.goBack();
    }
    const onKeyPressHandler = (event) => {
        if (event.key === 'Enter') {
            fectchBoardData();
        }
    }

    const OkbtnHandler = (event) => {
        event.preventDefault();
        fectchBoardData();
    }

    const fectchBoardData = async () => {
        let body = {
            boardId: location.state.boardId,
            pw: Pw
        }
        //console.log(boardId);
        const response = await axios.post('/api/board/boardPwCheck', body)

        //console.log(response.data)
        if(location.state.behavior === 'modify'){
            console.log(response.data)
            if(response.data.pwCheck === true) {
                history.push({
                    pathname:'/board/LogoutModify',
                    state: {
                        boardId: location.state.boardId,
                        password: Pw}})
            } else {
                alert('비밀번호가 틀렸습니다.')
            }
        } else if(location.state.behavior === 'delete') {
            if(response.data.pwCheck === true) {
                history.push({
                    pathname:'/board/LogoutDelete',
                    state: {
                        boardId: location.state.boardId,
                        password: Pw}})
            } else {
                alert('비밀번호가 틀렸습니다.')
            }
        }
        
    }
    useEffect(() => {

        const checkLogin = getCookie('userId');

        if(checkLogin === null) {   //로그아웃 상태
            if (location.state.boardId === undefined || location.state.boardId === null) {
                history.goBack();
                //url로 오는경우가 있을때
                //보드 id값이 없으면 뒤로가기
            }
            else{
                boardId = location.state.boardId;
            }
        } else {    //로그인 상태
            history.goBack();
        }
    }, [])

    return (
        <div style={{ width: '100%' }}>
            <header className="content">

                <div className="empty1"></div>

                <div className="CheckTopitem">
                    <div className="topContent">
                        <div style={{ marginTop: "100px" }}>
                            <fieldset className="PwBorder">
                                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                    비밀번호를 입력하세요
                                </div>

                                <div className="CheckdivStyle">
                                    <input type="password" onKeyPress={onKeyPressHandler} value={Pw} onChange={onPwHandler} className="CheckPwInput" />
                                    <div style={{ display: 'flex', paddingTop: '30px', margin: '0 auto' }}>
                                        <button onClick={cancelBtnHandler} className="Cancelbtn">취소</button>
                                        <button onClick={OkbtnHandler} className="Okbtn">확인</button>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        {/* 로그인한 상태면 로그아웃만
                        로그아웃 상태면 회원가입 로그인 */}
                        {/* 수정 삭제 회원가입,로그인 css 정도만 하고 끝//댓글(?) */}
                    </div>

                </div>
                <div className="empty1"></div>

            </header>
            <footer>
                df
            </footer>
        </div>
    )
}

export default withRouter(CheckPw)

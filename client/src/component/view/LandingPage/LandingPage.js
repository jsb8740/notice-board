import React from 'react'
import axios from 'axios';
import { withRouter, useHistory } from 'react-router-dom';

import Board from './Board/Board';
import SearchingBox from '../SearchBoard/SearchingBox';
import './LandingPage.css'
import img from '../Commons/board2.png'
import { getCookie } from '../Commons/CookieCheck'

function LandingPage(props) {

    const loginCheck = getCookie('userId'); //null이면 로그아웃

    const onClickLogoutHandler = function (){
        axios.get('/api/users/logout')
        .then(response => {
            if (response.data.success) {
                props.history.push('/');
            }
            else {
                alert('이미 로그아웃상태입니다')
            }
        })
    }
    
    const history = useHistory()
    const onClickLoginHandler = function () {
        history.push('/login')
    }

    const onClickRegisterHandler = () => {
        history.push('/register')
    }
    return (
        <div style={{width:'100%'}}>
            <header>
                <div className="content">                
                    <div className="empty1"></div>
                        
                    <div className="topitem">
                        <div className="topContent">
                            <a href="/">
                                <img src={img} />
                            </a>
                            <span className="boardTitle">
                                <a href="/" className="topTitle">내가 만든 게시판</a></span>

                            {
                                loginCheck ===  null //로그아웃상태면
                                ?<span>
                                    <button className="loginButton" onClick={onClickLoginHandler}>로그인</button>
                                    <button className="registerButton" onClick={onClickRegisterHandler}>회원가입</button>
                                </span>
                                :<button className="logoutButton" onClick={onClickLogoutHandler}>로그아웃</button>
                            }
                            {/* 수정 삭제 회원가입,로그인 css 정도만 하고 끝//댓글(?) */}
                        </div>
                        
                    </div>
                    <div className="empty1"></div>
                </div>
            </header>
            <Board></Board>
            <footer>
                <SearchingBox/>
            </footer>
        </div>
    )
}

export default withRouter(LandingPage)

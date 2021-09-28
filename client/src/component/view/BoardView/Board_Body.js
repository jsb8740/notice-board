import React from 'react';
import './Board_Body.css';
import {withRouter ,Link, useHistory} from 'react-router-dom';
import img from '../Commons/logincheck.png'
import { getCookie } from '../Commons/CookieCheck'


function Board_Body({boardId, boardData}) {
    console.log(boardId);


    const loginCheck = getCookie('userId');

    const history = useHistory()
    const LogoutModifybuttonHandler = (event) => {
        event.preventDefault();

        history.push({
            pathname: `/board/CheckPw`
                , state: { 
                    boardId: boardId.boardId, 
                    behavior: "modify"
                }
        })

    }

    const LoginModifybuttonHandler = (event) => {
        event.preventDefault();

        history.push({
            pathname: `/board/LoginModify`
                , state: { boardId: boardId.boardId }
        })

    }

    const LogoutDeleteybuttonHandler = (event) => {
        event.preventDefault();

        history.push({
            pathname: `/board/CheckPw`
                , state: { 
                    boardId: boardId.boardId,
                    behavior: "delete"
                }
        })

    }

    const LoginDeleteybuttonHandler = (event) => {
        event.preventDefault();

        history.push({
            pathname: `/board/LoginDelete`
                , state: { 
                    boardId: boardId.boardId }
        })

    }
    
    console.log(boardData.password)
    return (
        <main>
            <div className="content">
                <div className="empty1">
                </div>

                <div className="item">
                    <div className="top">
                        <div className="titleBody">{boardData.title}</div>
                        {
                            boardData.password === null //패스워드가 없는상태면 로그인상태임
                            ? <div className="writerBody">{boardData.writer}<img src={img} /></div>
                            : <div className="writerBody">{boardData.writer}</div>
                        }
                        {/* <div className="writerBody">
                            {boardData.writer}</div> */}
                        <div className="dateBody">{boardData.uploadTime}</div>
                    </div>
                    <div className="contentText">
                        {boardData.contents}
                    </div>

                    <div style={{marginBottom:'20px'}}>
                        
                        <Link to='/'>
                            <button className="post_list">글목록</button>
                        </Link>

                        <Link to='/write'>
                            <button className="button_write">글쓰기</button>
                        </Link>
                        

                        {
                            loginCheck === null //로그아웃상태
                                ?
                                boardData.password === null //로그인한사람이 쓴 게시판
                                    ? <span></span>
                                    :   //로그아웃 상태이고 로그아웃한 사람이 쓴 글
                                    <span className="buttonDiv">   
                                        <button className="button_modify" onClick={LogoutModifybuttonHandler}>수정</button>
                                        <button className="button_delete" onClick={LogoutDeleteybuttonHandler}>삭제</button>
                                    </span>
                                
                                : //로그인 한 상태
                                boardData.password === null //로그인한사람이 쓴 게시판
                                    ?
                                    <span className="buttonDiv">
                                        <button className="button_modify" onClick={LoginModifybuttonHandler}>수정</button>
                                        <button className="button_delete" onClick={LoginDeleteybuttonHandler}>삭제</button>
                                    </span>
                                    :
                                    <span></span>
                                
                        }
                        
                        
                        
                        
                    </div>
                </div>

                <div className="empty1">
                </div>
            </div>
        </main>
    )
}

export default withRouter(Board_Body)

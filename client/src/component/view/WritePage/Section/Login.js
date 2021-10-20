import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { boardWrite } from '../../../../_action/board_action';
import { withRouter, useHistory } from 'react-router-dom'
import '../../BoardView/Board_Body.css'
import './write.css'
import img from '../../Commons/logincheck.png'

function Login({ nickname }) {
    const [Title, setTitle] = useState("");
    const [Contents, setContents] = useState("");

    const onTitleHandler = (event) => {
        setTitle(event.target.value)
    }

    const onContentsHandler = (event) => {
        setContents(event.target.value)
    }

    const dispatch = useDispatch()

    const history = useHistory()
    const onClickCancelBtnHandler = (event) => {
        event.preventDefault();

        let cancelCheck = window.confirm('글 작성을 취소하시겠습니까?');

        if (cancelCheck === true) {
            history.goBack();
        }
    }
    const onClickOkBtnHandler = (event) => {
        event.preventDefault();

        let body = {
            title: Title,
            contents: Contents,
            writer: nickname,
            password: null
        }

        dispatch(boardWrite(body)).
            then((response) => {
                console.log(response)
                if (response.payload.success) {
                    //홈으로 이동
                    history.push('/')
                } else {
                    alert('오류가 있습니다')
                }
            })
    }

    return (
        <div className="content">
            <div className="empty1">
            </div>

            <div className="item">
                <div className="top">
                    <div className="titleBody">
                        <input className="titleInput" type='text' value={Title} onChange={onTitleHandler} placeholder="제목을 입력해 주세요" />
                    </div>
                    <div className="writerBody">
                        {nickname}<img src={img} />
                    </div>

                </div>
                <div className="contentText">
                    <textarea className="ContentInput" value={Contents} onChange={onContentsHandler} />
                    <div style={{ marginTop: '10px' }}>
                        <button className="button_cancel" onClick={onClickCancelBtnHandler}>취소</button>
                        <button className="button_ok" onClick={onClickOkBtnHandler}>등록</button>
                    </div>

                </div>

                <div style={{ marginBottom: '20px' }}>

                </div>
            </div>

            <div className="empty1">
            </div>
        </div>
    )
}

export default withRouter(Login)

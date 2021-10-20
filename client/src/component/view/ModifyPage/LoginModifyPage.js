import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter, useLocation, useHistory } from 'react-router'
import { boardModify } from '../../../_action/board_action';
import img from '../Commons/logincheck.png'

function LoginModifyPage() {
    const location = useLocation();
    let boardId = null;

    const history = useHistory()
    // console.log(location.state)

    const [Title, setTitle] = useState("");
    const [Contents, setContents] = useState("");
    const [NickName, setNickName] = useState("");

    // 비밀번호 체크 db에 저장된 암호화 비밀번호랑 비교
    //버튼을 클릭하면 게시판view에서 props로 그 게시판 데이터를 보내서
    //text로 value보냄 그리고 update
    //로그인한사람이 글쓴거면 비로그인일경우 안보이게
    //로그인한자신이 쓴글만 수정 삭제 보임


    const onTitleHandler = (event) => {
        setTitle(event.target.value)
    }

    const onContentsHandler = (event) => {
        setContents(event.target.value)
    }


    const dispatch = useDispatch();
    const onClickOkBtnHandler = (event) =>{
        event.preventDefault();
        console.log(location.state.boardId)
        let body = {
            boardid: location.state.boardId,
            title: Title,
            contents: Contents,
            writer: NickName,
        }
        dispatch(boardModify(body))
            .then((response => {
                console.log(response.payload.success)
                if(response.payload.success === true) {
                    history.push(`/board/view/${location.state.boardId}`)
                }
                else {
                    alert('오류가 났습니다')
                    history.push(`/board/view/${location.state.boardId}`)
                }
            }))
        
        // alert('gd')
    }

    const onClickCancelBtnHandler = (event) => {
        event.preventDefault();

        let cancelCheck = window.confirm('글 수정을 취소하시겠습니까?');

        if (cancelCheck === true) {
            history.goBack();
        }
    }

    const fectchBoardData = async () => {
        boardId = location.state;
        //console.log(boardId);
        const response = await axios.post('/api/board/getContents', boardId)

        //console.log(response.data)

        setTitle(response.data.title)
        setContents(response.data.contents)
        setNickName(response.data.writer)
    }
    useEffect(() => {
        if (location.state.boardId === undefined || location.state.boardId === null) {
            history.goBack();
            //url로 오는경우가 있을때
            //보드 id값이 없으면 뒤로가기
        }
        else{
            fectchBoardData();
            
        }
    }, [])
    return (
        // <div style={{
        //     display: 'flex', justifyContent: 'center', alignItems: 'center',
        //     width: '100%', height: '100vh'
        // }}>
        //     <h2>login글수정</h2>
        //     <form onSubmit={onSubmitHandler}>
        //         <label>닉네임 : {NickName}</label>
                
        //         <hr/>
        //         <label>title</label>
        //         <input type='text' value={Title} onChange={onTitleHandler} />
        //         <hr/>

        //         <textarea value={Contents} onChange={onContentsHandler} />
        //         <button>go</button>
        //     </form>
        //     </div>   
            //
            <div className="content">
            <div className="empty1">
            </div>

            <div className="item">
                <div className="top">
                    <div className="titleBody">
                        <input className="titleInput" type='text' value={Title} onChange={onTitleHandler} placeholder="제목을 입력해 주세요" />
                    </div>
                    <div className="writerBody">
                        {NickName}<img src={img} />
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

export default withRouter(LoginModifyPage)

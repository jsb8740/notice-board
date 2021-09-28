import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter, useLocation, useHistory } from 'react-router'
import { boardModify } from '../../../_action/board_action';

function LogoutModifyPage() {

    const location = useLocation();
    let boardIdAndPw = null;

    const history = useHistory()
    // console.log(location.state)

    const [Title, setTitle] = useState("");
    const [Contents, setContents] = useState("");
    const [NickName, setNickName] = useState("")
    const [PassWord, setPassWord] = useState("")

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
    const onSubmitHandler = (event) =>{
        event.preventDefault();
        console.log(location.state.boardId)
        let body = {
            boardid: location.state.boardId,
            title: Title,
            contents: Contents,
            writer: NickName,
            password: PassWord,
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


    const fectchBoardData = async () => {
        boardIdAndPw = location.state;
        //console.log(boardId);
        const response = await axios.post('/api/board/getContents', boardIdAndPw)

        //console.log(response.data)

        setTitle(response.data.title)
        setContents(response.data.contents)
        setNickName(response.data.writer)
        setPassWord(location.state.password)
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
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>logout글수정</h2>
            <form onSubmit={onSubmitHandler}>
                <label>닉네임</label>
                <input style={{width: '60px'}}
                type='text' value={NickName} readOnly/>
                <label>비밀번호</label>
                <input style={{width: '60px'}} 
                type='password' value={PassWord} readOnly/>

                <hr/>
                <label>title</label>
                <input type='text' value={Title} onChange={onTitleHandler} />
                <hr/>

                <textarea value={Contents} onChange={onContentsHandler} />
                <button>go</button>
            </form>

        </div>
    )
}

export default withRouter(LogoutModifyPage)

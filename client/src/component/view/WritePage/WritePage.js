import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { getCookie } from '../Commons/CookieCheck'
import Login from './Section/Login';
import Logout from './Section/Logout';


function WritePage() {
    const [UserId, setUserId] = useState("")
    const [NickName, setNickName] = useState("")

    const userid = getCookie('userId');

    const fetchUserData = async () => {
        let body = {
            userid: userid
        }

        //서버로 요청함 서버에서 쿠키를이용해 find로 검색해서 닉네임 가져오기
        //서버에서 res올때까지 대기함
        const response = await axios.post('/api/board/getUserData', body)    
        console.log(response)
        //닉네임저장
        setNickName(response.data.nickname)
    }
    
    useEffect(() => {
        setUserId(userid);
        fetchUserData()
    }, [])

    return (
        //userId가 null이면 로그아웃한 상태 그러면 logout을 출력함
        UserId === null ? <Logout/> : <Login nickname={NickName}/>
    )
}

export default withRouter(WritePage)

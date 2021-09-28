import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userRegister } from '../../../_action/user_action'
import { withRouter, useHistory } from 'react-router-dom'
import './RegisterPage.css'

function RegisterPage(props) {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [NickName, setNickName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch();

    const onNickNameHandler = (event) => {
        setNickName(event.target.value);
    }

    const onEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const onCofirmPasswordHandler = (evnet) => {
        setConfirmPassword(evnet.target.value)
    }

    const history = useHistory()
    const onClickCancelHandler = (event) => {
        event.preventDefault();
        
        history.goBack()
    }

    const onClickRegisterHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) { //비번이 다르면
            return alert('Password와 Confirm Password는 같아야 합니다');
        }

        let body = {
            email: Email,
            password: Password,
            nickname: NickName
        }
        dispatch(userRegister(body))
        .then((response) => {
            //console.log('registerPage'+JSON.stringify(response));
            
            if(response.payload.success){
                props.history.push('/login');
            } else {
                alert('failed to sign up')
            }
        })
    }

    return (
        <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            width: '100vw', height: '100vh'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>이메일</label>
                <input className="PwText" type='email' value={Email} onChange={onEmailHandler} />
                <label>닉네임</label>
                <input className="PwText" type='nickname' value={NickName} onChange={onNickNameHandler} />
                <label>패스워드</label>
                <input className="PwText" type='password' value={Password} onChange={onPasswordHandler} />
                <label>패스워드 확인</label>
                <input className="PwText" type='password' value={ConfirmPassword} onChange={onCofirmPasswordHandler} />

                <br />
                <div style={{margin:'0 auto'}}>
                    <button className="cancelBt" onClick={onClickCancelHandler}>취소</button>
                    <button className="okBtn" onClick={onClickRegisterHandler}>만들기</button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(RegisterPage)

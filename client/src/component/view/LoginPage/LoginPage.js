import React, {useState } from 'react'
import {useDispatch} from 'react-redux'
import { userLogin } from '../../../_action/user_action'
import { withRouter, useHistory } from 'react-router-dom'
import '../RegisterPage/RegisterPage.css'

function LoginPage(props) {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("")

    const dispatch = useDispatch();

    const onEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const history = useHistory()
    const onClickCancelHandler = (event) => {
        event.preventDefault();
        
        history.goBack()
    }
    const onClickLoginHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }
        dispatch(userLogin(body))
        .then(response=>{
            console.log(response);

            if(response.payload.loginSuccess){
                props.history.push('/');
            } else {
                alert('failed to login');
            }
            
        })
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', 
        justifyContent: 'center',
        width: '100vw', height:'100vh'}}>
            <form style={{display:'flex', flexDirection:'column'}}>
                <label>Email</label>
                <input className="TextInput" type='email' value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input className="PwText" type='password' value={Password} onChange={onPasswordHandler}/>
                

                <br/>
                <div style={{margin:'0 auto'}}>
                    <button className="cancelBt" onClick={onClickCancelHandler}>Cancel</button>
                    <button className="okBtn" onClick={onClickLoginHandler}>Login</button>
                    
                </div>
                
            </form>
        </div>
    )
}

export default withRouter(LoginPage)

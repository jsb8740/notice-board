import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../_action/user_action'

export default function (SpecificComponent, option, adminRouter = null) {

    //option 
    //null 아무나
    //true 로그인한유저만
    //false 로그인안한 유저만

    //backend에 request를 날려서 상태를 가져옴
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            //첫번째 부모 컴포넌트라서 withRouter을 사용안함
            dispatch(auth()).then(response => {
               // console.log(response)

                //로그인 안한 상태
                if (!response.payload.isAuth) {
                    //로그인 안했는데 로그인한 유저만 가는페이지 가려할때
                    if (option) {
                        //login창으로 보냄
                        props.history.push('/login')
                    }

                } else {
                    //로그인 한 상태
                    //어드민이 들어갈수 있는 페이지 들어갈때
                    if (adminRouter && !response.payload.isAdmin) {
                        //home으로 보냄
                        props.history.push('/')
                    } else {
                        //로그인 했는데 로그인안한 유저만 가는 페이지 가려할때
                        if (option === false) {
                            //home으로 보냄
                            props.history.push('/')
                        }
                    }
                }
            })

        }, [])

        return <SpecificComponent />;
    }


    return AuthenticationCheck;
}
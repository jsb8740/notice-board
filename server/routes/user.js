const express = require('express')
const router = express.Router();
const { User } = require('../models/User')
const { auth } =  require('../middleware/auth')

router.post('/register', (req, res) => {
    //회원가입 client에서 정보오면 (req)
    //console.log(req);
    const user = new User(req.body);


    //email이 중복확인 후 db에 넣어줌

    user.save(function (err, userinfo){
        console.log(userinfo);
        if(err) return res.status(400).json({success: false, err});
        return res.status(200).json({success: true})
    })
})

router.post('/login', (req, res) => {
    //client에서 로그인 정보 -> req
    //db에서 로그인한 아이디 찾기
    User.findOne({email: req.body.email}, function(err, userInfo) {
        //err 처리
        if(err) return res.status(400).json({err});


        //유저 정보가 없으면
        if(!userInfo){
            return res.json({
                loginSuccess: false,
                message: "Email does not exist"
            })
        }

        //있으면 비밀번호 확인
        //console.log(userInfo);
        userInfo.comparePassword(req.body.password, function(err, result){
            //console.log(result);

            //result==비밀번호가 맞는지 틀린지가 없으면 json보냄
            if(!result) return res.json({
                loginSuccess: false,
                message: "Passwords do not match"
            })

            
            //비밀번호가 맞으면 토큰을 발급 cookie방식으로 보냄
            userInfo.makeToken(function(err, userInfo){
                if(err) return res.status(400).send(err);

                console.log('----userinfo----');
                console.log(userInfo._id);
                //유저 id도 쿠키로 클라이언트에 보냄
                let userId = userInfo._id;
                res.cookie('userId', userId);

                res.cookie('userAuth', userInfo.token).status(200)
                    .json({
                        loginSuccess:true,
                        userId: userInfo._id
                    })
            })
        })
    })

    
})



//callback을 하기전에 중간에 auth가 실행됨
router.get('/auth', auth, (req, res) => {
    //여기까지 왔으면 auth를 통과했음 true임

    res.status(200).json({
        _id: req.user._id,
        //role == 0 일반유저
        //role == 1 어드민
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        nickname: req.user.nickname,
        role: req.user.role
    })
})

router.get('/logout', auth,(req, res) => {
    //console.log(req.user)
    User.findOneAndUpdate({
        _id: req.user._id}, 
        {token: ""},
        (err, user) => {
            if (err) return res.json({success: false, err});
            
            //로그아웃시 쿠키삭제
            res.clearCookie('userAuth');
            res.clearCookie('userId')
            return res.status(200).send({success: true});
        })
})

module.exports = router;
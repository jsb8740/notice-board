const { User } = require('../models/User')

let auth = (req, res, next) => {

    //인증 처리를 하는부분


    //client 쿠키에서 token을 가져옴
    let token = req.cookies.userAuth;

    //token을 decode한후 유저를 찾음

    User.findByToken(token, (err, user) => {
        //err처리
        if (err) throw err;

        //user정보가 없으면
        if (!user) return res.json({ isAuth: false, error: true })

        //유저가 있으면
        req.token = token;  //req에 token, user 정보를 추가함
        req.user = user;

        next();
    })
}


module.exports = { auth }
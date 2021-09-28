const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config')

const userSchema = mongoose.Schema({
    nickname:{
        type:String,
        maxlength: 20,
        trim: true
    },
    password:{
        type:String,
        minlength: 4,
        trim: true
    },
    email:{
        type:String,
        unique: true,
        trim: true
    },
    role:{
        type:Number,
    },
    token:{
        type:String,
    },
    tokenExp: {
        type:Number
    }
})


const saltRound = 10;   //10글자인 salt를 만듬
userSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')){ //해당값이 db에 기록된 값과 비교해서 변경된 경우 true
        //user생성시에는 항상 true, user 수정시에는 pw가 변경되는 경우만 true
        
        bcrypt.genSalt(saltRound, function(err, salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, result) {
        if(err) return cb(err);

        return cb(null, result);
    })
}

userSchema.methods.makeToken = function(cb){
    //jsonwebtoken 이용해 token 생성
    //_id를 payload로 사용하러면 toJSON()으로 바꿔줘야함
    var token = jwt.sign(this._id.toJSON(), config.secret);

    //db에 token을 저장
    this.token = token;
    this.save(function(err, userInfo) {
        if(err) return cb(err);
        return cb(null ,userInfo);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    //토큰을 decode
    jwt.verify(token, config.secret, function(err, decoded){
        //decode된걸(userID)로 유저를 찾음
        //client에서 가져온 토큰과 db의 토큰이 일치하는지 확인
        user.findOne({ "_id": decoded, "token": token }, function(err, user) {
            if (err) return cb(err);

            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);
module.exports = {User}
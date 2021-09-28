const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');


const autoIncrement = require('mongoose-auto-increment');//자동 증가가 필요해서
autoIncrement.initialize(mongoose.connection)

const boardSchema = mongoose.Schema({
    writer:{
        type: String
    },
    title: {
        type: String,
        maxlength: 30
    },
    contents: {
        type: String,
        maxlength: 400
    },
    password: {
        type:String,
        trim: true,
        default: null
    },
    uploadTime: {
        type:String,
        default: moment().format('MM-DD, HH:mm')
    },
    boardNumber: {
        type:Number
    }
}, ) 
//기본적으로 timestamps는 ISODate로  나와서 우리가 아는 시간하고 다르다
//한국시간으로 바꿔줘야함

boardSchema.plugin(autoIncrement.plugin, {
    model: 'Board',
    field: 'boardNumber',
    startAt: 1,
    incrementBy: 1
})

const saltRounds = 10;
boardSchema.pre('save', function (next) {
    var board = this;
    

    if(board.password === null || board.password === undefined) {
        //로그인상태일때는 password를 안보냄
        next()
    }

    //로그아웃상태에서만 글쓸때에는 패스워드 저장
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err)

        bcrypt.hash(board.password, salt, function(err, hash) {
            if(err) return next(err)
            board.password = hash;
            next()
        })
    })
})

boardSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, result) {
        if(err) return cb(err);

        return cb(null, result);
    })
}


const Board = mongoose.model('Board', boardSchema)
module.exports = { Board } 
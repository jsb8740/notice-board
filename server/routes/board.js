const express = require('express')
const router = express.Router();
const { User } = require('../models/User')
const { Board } = require('../models/Board')

router.post('/delete', (req, res) => {
    const filter = {_id: req.body.boardId}
    console.log(filter)
    Board.deleteOne(filter, function(err) {
        if(err) return res.status(400).json({deleteSuccess: false, err})

        return res.status(200).json({deleteSuccess: true})
    })
})

router.post('/modify', (req, res) => {
    //console.log(req.body)
    const filter = {_id: req.body.boardid};
    const update = {
        title: req.body.title,
        contents: req.body.contents,
        writer: req.body.writer,
        password: req.body.password
    }
    //console.log(filter)
    console.log(update)
    Board.findOne(filter, function(err, boardInfo) {
        if(err) return res.status(400).json({err})
        if(!boardInfo){
            return res.json({
                getBoardData: false,
                message: "boardData does not exist"
            })
        }
        
        
        console.log(boardInfo)
        boardInfo.title = update.title;
        boardInfo.contents = update.contents;

        console.log('update' + boardInfo)

        // console.log(boardInfo)
        // boardInfo.title = update.title;
        // boardInfo.contents = update.contents;
        // console.log('update' + boardInfo)
        
        

        boardInfo.save(function (err, boardinfo) {
            console.log(boardinfo);
            
            if(err) return res.status(400).json({success: false, err});
            return res.status(200).json({success: true, boardinfo})
        })
    })
})

router.post('/boardPwCheck', (req, res) => {
    console.log(req.body);
    Board.findOne({_id: req.body.boardId}, function (err, boardInfo) {
        if(err) return res.status(400).json({err})
        if(!boardInfo){
            return res.json({
                getBoardData: false,
                message: "boardData does not exist"
            })
        }
        boardInfo.comparePassword(req.body.pw, function(err, result){
            if(err) return res.status(400).json({err})
            if(!result) return res.json({
                pwCheck: false,
                message: "Passwords do not match"
            })

            console.log(result)
            return res.status(200).json(
                {pwCheck: true, result}
            )
        })

    })
})


router.post('/searchBoard', (req, res) => {
    console.log(req.body);
    if(req.body.selected === 'title_content'){
        
        console.log('title_content');
        Board.find({$or:[{title: req.body.keyWord},{contents: req.body.keyWord} ]})
        .sort({boardNumber: 'desc'})
        .exec(function (err, searchBoardData) {
            if(err) return res.status(400).json({err})

            if(!searchBoardData){
                return res.json({
                    getBoardData: false,
                    message: "searchBoardData does not exist"
                })
            }

            //찾는게시판이 없어서 []일 경우도 해야할듯?
            console.log(searchBoardData)
            return res.status(200).json(
                {success: true, searchBoardData}
            )
        })

    } else if(req.body.selected === 'title') {
        console.log('title');

        Board.find({title: req.body.keyWord})
        .sort({boardNumber: 'desc'})
        .exec(function (err, searchBoardData) {
            if(err) return res.status(400).json({err})

            if(!searchBoardData){
                return res.json({
                    getBoardData: false,
                    message: "searchBoardData does not exist"
                })
            }

            console.log(searchBoardData)
            return res.status(200).json(
                {success: true, searchBoardData}
            )
        })

    } else if(req.body.selected === 'writer') {
        console.log('writer');


        Board.find({writer: req.body.keyWord})
        .sort({boardNumber: 'desc'})
        .exec(function (err, searchBoardData) {
            if(err) return res.status(400).json({err})

            if(!searchBoardData){
                return res.json({
                    getBoardData: false,
                    message: "searchBoardData does not exist"
                })
            }

            console.log(searchBoardData)
            return res.status(200).json(
                {success: true, searchBoardData}
            )
        })

    }
})

router.post('/getContents', (req, res) => {
    console.log(req.body);
    Board.findOne({_id:req.body.boardId}, function (err, boardData) {
        if(err) return res.status(400).json({err})

        if(!boardData){
            return res.json({
                getBoardData: false,
                message: "boardData does not exist"
            })
        }

        return res.status(200).json({
            title: boardData.title,
            writer: boardData.writer,
            uploadTime: boardData.uploadTime,
            contents: boardData.contents,
            password: boardData.password,
            success: true
        })
    })
})

router.post('/getUserData', (req, res) => {
    console.log('==============')
    console.log(req.body.userid);
    User.findOne({_id: req.body.userid}, function (err, userData) {
        console.log(userData)
        if(err) return res.status(400).json({err})

        if(!userData){
            return res.json({
                getUserData: false,
                message: "userData does not exist"
            })
        }

        return res.status(200).json({
            nickname: userData.nickname,
            success: true
        })
    })
    //쿠키로 서버에서 find로 검색해서 닉네임 가져오기
})

router.get('/viewBoard', (req, res) => {

    //날짜순으로 sort해서 보내는게 좋아보임
    //게시판은 최근에 올라온 글이 제일 첫페이지 위에있음
    Board.find()
    .sort({boardNumber: 'desc'}).exec((error, boardData) => {
        //console.log('read all');
        
        if(error) return res.status(400).json({err})
        else {
            //console.log(boardData);
            return res.status(200).json(boardData);
        }
        // if(!boardData){
        //     return res.json({
        //         message: 'Data does not exist'
        //     })
        // }
    })
})

router.post('/write', (req, res) => {
    const board = new Board(req.body);
    console.log('dd', req.body)
    board.save(function (err, boardinfo) {
        console.log(boardinfo);
        
        if(err) return res.status(400).json({success: false, err});
        return res.status(200).json({success: true, boardinfo})
    })
})

module.exports = router;
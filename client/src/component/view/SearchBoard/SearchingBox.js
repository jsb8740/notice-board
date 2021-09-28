import React, { useState } from 'react'
import './SearchingBox.css'
import { withRouter, useHistory, Link } from 'react-router-dom'
import img from './search.png'

function SearchBoard() {
    const [Selected, Setselected] = useState("title_content");
    const [keyWord, setkeyWord] = useState("")


    const onContentsHandler = (event) => {
        setkeyWord(event.target.value)
    }

    const onSelectedeHandler = (event) => {
        Setselected(event.target.value)
        // console.log(selected)
    }

    const history = useHistory()
    const onKeyPressHandler = (event) => {
        
        if(event.key === 'Enter') {

            
            history.push({
                pathname: `/board/search/${keyWord}`
                , state: { selected: Selected }
            })
            window.location.replace(`/board/search/${keyWord}`)
            //렌더링이 안되서 replace사용
        }
    }

    return (
        <div className="searchLayout">
            <div className="empty1"></div>
            <div className="searchContent">
                <select onChange={onSelectedeHandler} className="combobox">
                    <option value="title_content" defaultValue>제목+내용</option>
                    <option value="title">제목</option>
                    <option value="writer">글쓴이</option>
                </select>

                <div className="searchBox">

                    <img className="btnImg" src={img}></img>
                    <input type="text" className="searchText"
                        value={keyWord}
                        onChange={onContentsHandler}
                        onKeyPress={onKeyPressHandler}></input>
                </div>

            </div>
            <div className="empty2"></div>
        </div>
    )
}

export default withRouter(SearchBoard)

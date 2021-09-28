import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Posts from './Posts';
import Pagination from './Pagination';
import './Board.css'

import { Link } from 'react-router-dom';

function Board() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10)  //한페이지에 몇개씩 출력할건지

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setLoading(true);
        const response = await axios.get('/api/board/viewBoard')
        // console.log(response.data)
        setPosts(response.data);
        setLoading(false);
    }

    const indexOfLast = currentPage * postsPerPage; // 1x10 = 10번 포스트
    const indexOfFirst = indexOfLast - postsPerPage;//10-10 = 0번 포스트
    function currentPosts(tmp) {
        let currentPosts = 0;
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }

    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
    }

    return (
        <main className="content">
            <div className="empty1"></div>
            <div className="item">
                <div>
                    <Posts posts={currentPosts(posts)} loading={loading}/>
                </div>

                <div>
                    <Link to='/home/reload'><button className="home_Button">글목록</button></Link>
                    <Link to='/write'><button className="write_Button">글쓰기</button></Link>
                </div>


                <div style={{textAlign:'center'}}>
                    <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} 
                    currentPage={currentPage} paginate={paginate}/> 
                    {
                        //여기서 state바꾸는 함수를 pagination으로 넘겨서
                        //state를 바꾸면 리렌더링을 다시함.
                    }
                </div>

                
            </div>
            <div className="empty2"></div>
        </main>
    )
}

export default Board

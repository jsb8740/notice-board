import React, { useEffect, useState } from 'react'
import { useParams, withRouter, useLocation, useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { boardSearch } from '../../../_action/board_action';
import '../LandingPage/LandingPage.css'
import { Link } from 'react-router-dom';
import Pagination from '../LandingPage/Board/Pagination';
import Posts from '../LandingPage/Board/Posts';
import img from '../Commons/board2.png'
import SearchingBox from './SearchingBox';
import axios from 'axios';
import { getCookie } from '../Commons/CookieCheck';

function SearchBoardView() {

    const params = useParams();
    const location = useLocation();

    const loginCheck = getCookie('userId'); //null이면 로그아웃
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10)  //한페이지에 몇개씩 출력할건지


    const dispatch = useDispatch()

    useEffect(() => {
        fetchData();
    }, [])

    const history = useHistory()
    const fetchData = () => {
        let body = {
            selected: location.state.selected,
            keyWord: params.keyWord
        }

        // console.log(params);
        // console.log(location.state.selected)
        
        dispatch(boardSearch(body))
        .then(response => {

            console.log(response.payload)
            if(response.payload.searchBoardData.length === 0){
                history.push('/')   //배열이 비었으면 홈으로
            }


            if(response.payload.success){
                // console.log(response)
                setLoading(true);
                const boardData = response.payload.searchBoardData;
                // console.log("boardData")

                setPosts(boardData)
                setLoading(false)
            }
        })
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

    const onClickLogoutHandler = function (){
        axios.get('/api/users/logout')
        .then(response => {
            if (response.data.success) {
                history.push('/');
            }
            else {
                alert('이미 로그아웃상태입니다')
            }
        })
    }
    
    const onClickLoginHandler = function () {
        history.push('/login')
    }

    const onClickRegisterHandler = () => {
        history.push('/register')
    }
    // console.log(posts.length);
    return (
        <div>
            <header className="content">
                
                <div className="empty1"></div>
                    
                <div className="topitem">
                    <div className="topContent">
                        <a href="/">
                            <img src={img} />
                        </a>
                        <span className="boardTitle">
                            <a href="/" className="topTitle">내가 만든 게시판</a></span>
                        
                            {
                                loginCheck ===  null //로그아웃상태면
                                ?<span>
                                    <button className="loginButton" onClick={onClickLoginHandler}>로그인</button>
                                    <button className="registerButton" onClick={onClickRegisterHandler}>회원가입</button>
                                </span>
                                :<button className="logoutButton" onClick={onClickLogoutHandler}>로그아웃</button>
                            }

                        {/* <button>로그인</button>
                        <button onClick={onClickLogoutHandler}>로그아웃</button>
                        <button>회원가입</button> */}
                        {/* 로그인한 상태면 로그아웃만
                        로그아웃 상태면 회원가입 로그인 */}
                        {/* 수정 삭제 회원가입,로그인 css 정도만 하고 끝//댓글(?) */}
                    </div>
                    
                </div>
                <div className="empty1"></div>
                
            </header>
            
            <main className="content">
                <div className="empty1"></div>
                <div className="item">
                    <div>
                        <Posts posts={currentPosts(posts)} loading={loading} />
                    </div>

                    <div>
                        <Link to='/'><button className="home_Button">글목록</button></Link>
                        <Link to='/write'><button className="write_Button">글쓰기</button></Link>


                    </div>


                    <div style={{ textAlign: 'center' }}>
                        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length}
                            currentPage={currentPage} paginate={paginate} />
                        {
                            //여기서 state바꾸는 함수를 pagination으로 넘겨서
                            //state를 바꾸면 리렌더링을 다시함.
                        }
                    </div>



                </div>
                <div className="empty2"></div>
            </main>
            <footer>
                <SearchingBox/>
            </footer>
        </div>
    )
}

export default withRouter(SearchBoardView)

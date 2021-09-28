import React from 'react'
import './Posts.css'
import img from '../../Commons/logincheck.png'

function Posts({posts, loading}) {
    console.log(posts);
    let postsNumber = posts.length;
    return (

        <div>
            {
                loading &&
                <div> loading </div>
            }
            {
                //list
            }
            <table>
                <thead>
                    <tr>
                        <th className="num">번호</th>
                        <th className="title">제목</th>
                        <th className="writer">글쓴이</th>
                        <th className="date">작성일</th>
                    </tr>
                </thead>
                <tbody className="contents">
                    {
                        posts.map((post, index) => (
                            <tr key={index}>
                                <td className="center_text">{postsNumber--/*post.boardNumber*/}</td>
                                <td><a href={`/board/view/${post._id}`}>{post.title}</a></td>
                                {
                                    post.password === null 
                                    ? <td className="center_text">{post.writer}<img src={img}/></td>
                                    :<td className="center_text">{post.writer}</td>
                                }
                                {/* <td className="center_text">{post.writer}</td> */}
                                <td className="center_text">{post.uploadTime}</td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <tr><td id="last_td"></td></tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Posts

import React from 'react'
import './Pagination.css'

function Pagination({postsPerPage, totalPosts, currentPage, paginate}) {
    //총 페이지
    //모든페이지 / 한페이지에 출력할 게시판내용수
    const totalPage = Math.ceil(totalPosts / postsPerPage);  
    //9페이지가 나와야함
    
    const pageControl = 5;  //화면에 나타낼 페이지 수

    
    //만약 11번 페이지이면 11/10 = 2   2번째 그룹 페이지 쪽을 보여줘야함
    const pageDisplay = Math.ceil(currentPage/pageControl);//화면에 보여질 페이지 그룹
    const totalPageGroup = Math.ceil(totalPage/pageControl);//모든 페이지그룹수

    let displayLastPage = pageDisplay * pageControl; //화면에 보여질 마지막페이지

    //화면에 보여질 첫번째페이지
    let displayFirstPage = displayLastPage - (pageControl-1);
    
    if(displayLastPage > totalPage) {   //마지막페이지가 모든페이지보다 크면 안됨
        displayLastPage = totalPage;
    }
    const pageNumber = [];  //몇 페이지까지 있는지 저장하는 배열
    for(let i=displayFirstPage; i<=displayLastPage; i++) {
        pageNumber.push(i)
        
    }

    let rightArrow = null;
    let leftArrow = null;
    if (pageDisplay < totalPageGroup) {
        //화면에 보여질 페이지그룹 보다 모든 페이지 그룹수보다 작으면
        rightArrow = true;

    }
    if (pageDisplay > 1) {
        //화면에 보여질 페이지 그룹이 1보다 크면
        leftArrow = true;
    }

    // for(let i=1; i<=Math.ceil(totalPosts / postsPerPage); i++){ 
    //     //i=1 페이지는 1부터시작이니깐
    //     // ceil은 소수점을 올림함
    //     //모든페이지 , 내가 설정한 글개수 나눠서 몇페이지가 필요한지 확인
    //     pageNumber.push(i);
    // }

    return (
        <div className="pagination">
            <ul>
                {
                }
                {
                    leftArrow === true  //left end
                    ?<li><a onClick={() => {paginate(1)}} href='#!'>
                    &laquo;
                    </a></li>:null
                }
                {
                    //조건이 맞으면 이전페이지 그룹 추가
                    leftArrow === true
                    ? <li><a onClick={() => {paginate(displayFirstPage-1)}} href='#!'>
                        &lt;
                    </a></li>
                    :null
                }
                {pageNumber.map(number => (
                    currentPage===number
                    ?
                    <li key={number}>
                        <a className="selected" onClick={() => paginate(number)} href='#!'>
                            {
                                 //숫자를 누르면 state를 누른 숫자로 바꿈
                                number
                            }</a>
                    </li>
                    :
                    <li key={number}>
                        <a onClick={() => paginate(number)} href='#!'>
                            {
                                 //숫자를 누르면 state를 누른 숫자로 바꿈
                                number
                            }</a>
                    </li>
                ))}
                {
                    //조건이 맞으면 다음페이지 그룹 추가
                    rightArrow === true 
                    ? <li><a onClick={() => {paginate(displayLastPage+1)}} href='#!'>
                        &gt;
                        </a></li> 
                    : null 
                }
                {
                    //right end
                    rightArrow === true 
                    ? <li><a onClick={() => {paginate(totalPage)}} href='#!'>
                        &raquo;
                        </a></li> 
                    : null 
                }
                
            </ul>
        </div>
    )
}

export default Pagination

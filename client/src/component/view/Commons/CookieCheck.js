export function getCookie(name) {
    //정규표현식 사용
    let cookieValue = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    
    if(!cookieValue){   //쿠키가 없으면 null 리턴  로그아웃상태임
        return null;
    }
    //쿠키 디코드함 모양이 j:"value"
    let decodeCookie = decodeURIComponent(cookieValue[2]);
    
    //디코드한 쿠키를 잘라냄 
    //value"이런식으로 잘라냄
    let result = decodeCookie
        .substr(decodeCookie.indexOf('\"')+1, decodeCookie.indexOf('\"', 3))

    //마지막에 value"의 "를 잘라냄
    result = result.slice(0, -1); 
    return  result;
}
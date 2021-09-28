import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect 
} from "react-router-dom"
import Auth from './hoc/auth'

import LoginPage from "./component/view/LoginPage/LoginPage";
import RegisterPage from "./component/view/RegisterPage/RegisterPage";
import LandingPage from "./component/view/LandingPage/LandingPage";
import WritePage from "./component/view/WritePage/WritePage";
import BoardView from "./component/view/BoardView/BoardView";
import SearchBoardView from './component/view/SearchBoard/SearchBoardView';
import CheckPw from "./component/view/Commons/CheckPw";
import LogoutModifyPage from "./component/view/ModifyPage/LogoutModifyPage";
import LoginModifyPage from "./component/view/ModifyPage/LoginModifyPage";
import LogoutDeletePage from "./component/view/DeletePage/LogoutDeletePage";
import LoginDeletePage from "./component/view/DeletePage/LoginDeletePage";

import './component/view/Commons/Commons.css'

//null 이면 아무나
//true이면 로그인한 유저만
//false면 로그아웃한 유저만

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Redirect exact from="/home/reload" to="/"/>
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/write" component={Auth(WritePage, null)}/>
          <Route exact path="/board/view/:boardId" component={Auth(BoardView, null)}/>
          <Route exact path="/board/search/:keyWord" component={Auth(SearchBoardView, null)}/>
          <Redirect exact from="/board/search/reload" to="/board/view/:boardId"/>
          <Route exact path ="/board/CheckPw" component={Auth(CheckPw, false)}/>
          <Route exact path ="/board/LogoutModify" component={Auth(LogoutModifyPage, false)}/>
          <Route exact path ="/board/LoginModify" component={Auth(LoginModifyPage, true)}/>
          <Route exact path ="/board/LogoutDelete" component={Auth(LogoutDeletePage, false)}/>
          <Route exact path ="/board/LoginDelete" component={Auth(LoginDeletePage, true)}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;


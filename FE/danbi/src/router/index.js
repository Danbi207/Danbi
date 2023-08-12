import Login from "../Components/User/Login/Login";
import KakaoOauth from "../Components/User/Login/Oauth/KakaoOauth";
// import IpRequest from "../Components/Help/Ip/Request/IpRequest";
import Detail from "../Components/Help/Co/Detail/Detail";
import MatchedHelp from "../Components/Help/Co/Matched/MatchedHelp";
import Profile from "../Components/User/Profile/Profile";
import Friend from "../Components/User/Friend/Friend";
import UserSubmit from "../Components/User/Join/UserSubmit";
import IPHome from "../Components/Help/Ip/Home/IPHome";
import HelperHome from "../Components/Help/Helper/Home/HelperHome";
import Test from "../Components/TEST/TEST"
import IpMap from '../Components/Help/Ip/Request/Components/Map/IpMap'
import Admin from "../Components/Admin/Admin";
import Request from "../Components/Help/Ip/Request/Request";

const routes = [
  {
    path: "/",
    Component: Login,
  },
  {
    path:'/user/login/oauth',
    Component : KakaoOauth
  },
  {
    path : '/user/join',
    Component : UserSubmit,
  },
  {
    path: "/help/ip",
    Component : IPHome
  },
  {
    path : "/help/ip/request",
    // Component : IpRequest
    Component : Request
  },
  {
    path : "/help/ip/request/map/:mode",
    Component : IpMap
  },
  {
    path : "/help/helper",
    Component : HelperHome
  },
  {
    path : "/help/:role/detail/:helpPostId",
    Component : Detail
  },
  {
    path : "/help/:role/matched/:helpPostId",
    Component : MatchedHelp
  },
  {
    path: "/user/profile/:userId",
    Component:Profile
  },
  {
    path : "/user/friend",
    Component:Friend
  },
  {
    path:"/admin",
    Component:Admin
  },
  {
    path:"/test",
    Component:Test
  },
  {
    path:"/Request",
    Component:Request

  }
];
export default routes;
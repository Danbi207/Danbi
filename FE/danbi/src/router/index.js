import Login from "../Components/User/Login/Login";
import KakaoOauth from "../Components/User/Login/Oauth/KakaoOauth";
import IpRequest from "../Components/Help/Ip/Request/IpRequest";
import Detail from "../Components/Help/Co/Detail/Detail";
import MatchedHelp from "../Components/Help/Co/Matched/MatchedHelp";
import Profile from "../Components/User/Profile/Profile";
import Friend from "../Components/User/Friend/Friend";
import UserSubmit from "../Components/User/Join/UserSubmit";
import IPHome from "../Components/Help/Ip/Home/IPHome";
import HelperHome from "../Components/Help/Helper/Home/HelperHome";
import Test from "../Components/TEST/TEST"
const routes = [
  {
    path: "/",
    Component: Login,
  },
  {
    path:'/user/login/ouath',
    Component : KakaoOauth
  },
  {
    path : '/user/join',
    Component : UserSubmit,
  },
  {
    path: "/Help/ip",
    Component : IPHome
  },
  {
    path : "/Help/ip/request",
    Component : IpRequest
  },
  {
    path : "/Help/Helper",
    Component : HelperHome
  },
  {
    path : "/Help/:role/detail/:HelpPostId",
    Component : Detail
  },
  {
    path : "/Help/:role/matched/:HelpPostId",
    Component : MatchedHelp
  },
  {
    path: "/user/profile/:meberId",
    Component:Profile
  },
  {
    path : "/user/friend",
    Component:Friend
  },
  {
    path:"/test",
    Component:Test
  }
];
export default routes;
import Login from "../Components/Login/Login";
import KakaoOauth from "../Components/Login/oauth/KakaoOauth";
import IpRequest from "../Components/help/IP/Request/IpRequest";
import Detail from "../Components/help/co/Detail/Detail";
import MatchedHelp from "../Components/help/co/matched/MatchedHelp";
import Profile from "../Components/user/Profile/Profile";
import Friend from "../Components/user/Friend/Friend";
import UserSubmit from "../Components/Login/join";
import IPHome from "../Components/help/IP/Home/IPHome";
import HelperHome from "../Components/help/Helper/Home/HelperHome";
const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path:'/user/login/ouath',
    component : KakaoOauth
  },
  {
    path : '/user/join',
    component : UserSubmit,
  },
  {
    path: "/help/ip",
    component : IPHome
  },
  {
    path : "/help/ip/request",
    component : IpRequest
  },
  {
    path : "/help/helper",
    component : HelperHome
  },
  {
    path : "/help/:role/detail/:helpPostId",
    component : Detail
  },
  {
    path : "/help/:role/matched/:helpPostId",
    component : MatchedHelp
  },
  {
    path: "/user/profile/:meberId",
    component:Profile
  },
  {
    path : "/user/friend",
    component:Friend
  }
];
export default routes;
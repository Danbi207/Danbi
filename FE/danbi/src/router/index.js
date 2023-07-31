import Login from "../Components/Login/Login.jsx";
import Setting from "../Components/Common/Setting/Setting.jsx";
import Profile from '../Components/Profile/Profile.jsx';
import KakaoOauth from "../Components/Login/oauth/KakaoOauth.jsx";
import HelperHome from "../Components/Helper/Home/HelperHome.jsx"
import IPHome from "../Components/IP/IPHome.jsx";
import UserSubmit from "../Components/Login/UserSubmit.jsx";
import HelpRequest from "../Components/IP/HelpRequest.jsx";
import Detail from "../Components/Detail/Detail.jsx";
import Friend from '../Components/Friends/Friend.jsx';

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/oauth/kakao",
    component:KakaoOauth
  },
  {
    path:"/setting",
    component : Setting,
  },
  {
    path: "/profile",
    component : Profile,
  },
  {
    path: "/helper",
    component : HelperHome,
  },
  {
    path: "/ip",
    component : IPHome,
  },
  {
    path: "/userSubmit",
    component : UserSubmit,
  },
  {
    path: "/helprequest",
    component : HelpRequest,
  },
  {
    path:"help/:role/detail/:helpPostId",
    component : Detail,
  },
  {
    path: '/friend',
    component : Friend
  }
];
export default routes;
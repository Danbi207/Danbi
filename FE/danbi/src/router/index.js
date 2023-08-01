import Login from "../Components/Login/Login.jsx";
import Setting from "../Components/Common/Setting/Setting.jsx";
import Profile from '../Components/Profile/Profile.jsx';
import KakaoOauth from "../Components/Login/oauth/KakaoOauth.jsx";
import HelperHome from "../Components/Helper/Home/HelperHome.jsx"
import IPHome from "../Components/IP/IPHome.jsx";
import UserSubmit from "../Components/Login/UserSubmit.jsx";
import IpRequest from "../Components/IP/IpRequest.jsx";
import Detail from "../Components/Detail/Detail.jsx";
import Friend from '../Components/Friends/Friend.jsx';
import IpMap from "../Components/IP/Map/IpMap.jsx";


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
    path: "/iprequest",
    component : IpRequest,
  },
  {
    path: "/ipmap/:mapid",
    component : IpMap,
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
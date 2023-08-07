import Login from "../Components/Login/Login.jsx";
import Setting from "../Components/Common/Setting/Setting.jsx";
import Profile from '../Components/Profile/Profile.jsx';
import KakaoOauth from "../Components/Login/oauth/KakaoOauth.jsx";
import HelperHome from "../Components/Helper/Home/HelperHome.jsx"
import IPHome from "../Components/IP/IPHome.jsx";
import UserType from '../Components/Login/UserType.jsx'
import UserFile from '../Components/Login/UserFile.jsx'
import IpRequest from "../Components/IP/IpRequest.jsx";
import Detail from "../Components/Detail/Detail.jsx";
import MatchedHelp from "../Components/MatchedHelp/MatchedHelp.jsx";
import Friend from '../Components/Friends/Friend.jsx';
import IpMap from "../Components/IP/Map/IpMap.jsx";
import TEST from "../Components/TEST/TEST.jsx";

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
    path: "/userfile",
    component : UserFile,
  },
  {
    path: "/usertype",
    component : UserType,
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
    path:"/matchedhelp/:helpPostId",
    component:MatchedHelp,
  },
  {
    path: '/friend',
    component : Friend
  },
  {
    path: '/test',
    component : TEST
  }
];
export default routes;
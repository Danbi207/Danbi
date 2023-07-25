import Login from "../Components/Login/Login.jsx";
import Setting from "../Components/Common/Setting/Setting.jsx";
import Profile from '../Components/Profile/Profile.jsx';
import KakaoOauth from "../Components/Login/oauth/KakaoOauth.jsx";
import HelperHome from "../Components/Helper/Home/HelperHome.jsx"
import IPHome from "../Components/IP/IPHome.jsx";
import TypeSelect from '../Components/Login/TypeSelect.jsx';
import DocSubmit from "../Components/Login/DocSubmit.jsx";

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
    path: "/typeselect",
    component : TypeSelect,
  },
  {
    path: "/docsubmit",
    component : DocSubmit,
  },
  
];
export default routes;
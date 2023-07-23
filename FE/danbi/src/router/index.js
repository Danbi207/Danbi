import Login from "../Components/Login/Login.jsx";
import Setting from "../Components/Common/Setting/Setting.jsx";
import Profile from '../Components/Profile/Profile.jsx';
import KakaoOauth from "../Components/Login/oauth/KakaoOauth.jsx";
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
  }
];
export default routes;
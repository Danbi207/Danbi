import Login from "../Components/Login/Login.jsx";
import Setting from "../Components/Common/Setting/Setting.jsx";
import Profile from '../Components/Profile/Profile.jsx';

const routes = [
  {
    path: "/",
    component: Login,
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
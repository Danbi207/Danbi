import Login from "../Components/Login/Login.jsx";
import Setting from "../Components/Common/Setting/Setting.jsx";
const routes = [
  {
    path: "/",
    compoonent: Login,
  },
  {
    path:"/setting",
    compoonent : Setting,
  },
];
export default routes;
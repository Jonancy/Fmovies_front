import DayList from "../../features/home/components/top9/dayList";
import Admin from "../../pages/admin";
import Home from "../../pages/home";

const mainRoutes = [
  {
    id: "home",
    path: "/home",
    element: Home,
    hasLayout: true,
    isAdmin:false,
    isErrorPage:false

  },
  {
    id:'dashboard',
    path:'/admin/dashboard',
    element: Admin,
    hasLayout:true,
    isAdmin:true,
    isErrorPage:false

  }
];

export default mainRoutes;

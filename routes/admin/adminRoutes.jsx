import AccessControl from "../../features/admin/LeftBarValues/acessControl";
import UsersData from "../../features/admin/LeftBarValues/usersData";

const adminPath = '/admin/dashboard'

export const adminRoutes =[
    {
        id:'users',
        path:`${adminPath}/users`,
        element:UsersData,
        hasLayout:true,
        isAdmin:true,
        isErrorPage:false

    },
    {
        id:'accessControl',
        path:`${adminPath}/accessControl`,
        element:AccessControl,
        hasLayout: true,
        isAdmin:true,
        isErrorPage:false

    }
    ]
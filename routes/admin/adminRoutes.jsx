import AccessControl from "../../features/admin/LeftBarValues/acessControl";
import Admin from "../../pages/admin";

const adminPath = '/admin/dashboard'

export const adminRoutes =[
    {
        id:'admin',
        path:`${adminPath}/`,
        element:Admin,
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
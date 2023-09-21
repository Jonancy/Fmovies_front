import ErrorPage from "../../components/error/error";

export const errorPageRoutes= [
    //! * is used as path so that if the router dosent find the specific path then this will cover it as error 404 page 
    {
        id:'error404',
        path:'*',
        element:ErrorPage,
        hasLayout: true,
        isAdmin:false,
        isErrorPage:true
    }
]


import LandingPage from "../../pages/landingPage"


const landingRoute = [
    {
        id:'landingPage',
        path:'/',
        element:LandingPage,
        hasLayout:true,
        isAdmin:false,
        isErrorPage:false,
        isLandingPage:true,
        isAuthPage:false


    }
]

export default landingRoute
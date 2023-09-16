import Login from "../features/auth/Login"
import Register from "../features/auth/Register"



const authRoutes = [
    {
        id:'login',
        path:'/login',
        element:Login,
        hasLayout:true,
    },
    {
        id:'register',
        path:'/register',
        element:Register,
        hasLayout:true,
    }
]

export default authRoutes
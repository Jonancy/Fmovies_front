import authRoutes from "../auth/authRoutes";
import { errorPageRoutes } from "../error/errorPageRoute";
import landingRoute from "../landingRoute/landingRoute";
import mainRoutes from "../pages/mainRoutes";
import { movieDetails } from "../movie/moviesDetails";
import { adminRoutes } from "../admin/adminRoutes";


const allRoutes=[...mainRoutes,...movieDetails,...authRoutes,...landingRoute,...errorPageRoutes,...adminRoutes]


export default allRoutes
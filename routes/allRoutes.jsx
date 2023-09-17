import authRoutes from "./authRoutes";
import { errorPageRoutes } from "./errorPageRoute";
import landingRoute from "./landingRoute";
import mainRoutes from "./mainRoutes";
import { movieDetails } from "./moviesDetails";


const allRoutes=[...mainRoutes,...movieDetails,...authRoutes,...landingRoute,...errorPageRoutes]


export default allRoutes
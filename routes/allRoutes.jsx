import authRoutes from "./authRoutes";
import landingRoute from "./landingRoute";
import mainRoutes from "./mainRoutes";
import { movieDetails } from "./moviesDetails";


const allRoutes=[...mainRoutes,...movieDetails,...authRoutes,...landingRoute]


export default allRoutes
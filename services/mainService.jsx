
import axios from "axios";


const http = axios.create({
    baseURL:'https://api.themoviedb.org/3/movie'
})

export default http
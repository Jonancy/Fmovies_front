import axios from "axios";

export  const userHttp = axios.create(
    {baseURL:'http://localhost:5000/api/users',
})
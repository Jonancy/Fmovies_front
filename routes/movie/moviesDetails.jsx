import MovieListsPage2 from "../../pages/movieLists2";
import MovieListsPage from "../../pages/movieListsPage";
import Movies from "../../pages/movies";


export const movieDetails =[
    {
        id:'movie',
        path:'/movie/:id',
        element:Movies,
        hasLayout:true,
        isAdmin:false,
        isErrorPage:false,
        isAuthPage:false


    },
    {
        id:'movieLists',
        path:'/movieLists',
        element:MovieListsPage,
        hasLayout:true,
        isAdmin:false,
        isErrorPage:false,
        isAuthPage:false


    },
    {
        id:'movieLists2',
        path:'/movieLists2',
        element:MovieListsPage2,
        hasLayout:true,
        isAdmin:false,
        isErrorPage:false,
        isAuthPage:false


    }

]
import React, { Fragment, Suspense } from "react";
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import allRoutes from "./allRoutes";
import MainLayout from "../layouts/mainLayout";
import LandingLayout from "../layouts/landingLayout";
import Error404Layout from "../layouts/error404Layout";
import ErrorPage from "../components/error/error";


function MainLayoutWrapper({routes, children}) {

    //!If the element or URL dosent have its path then the error 404 element will handle it by * as its path as it catches all the unmatched routes like unknown paths and displays the error404 page
    const MainWrapper = routes.hasLayout? MainLayout : Error404Layout

    //!Not needed 
    // const LandingWrapper = routes.hasLayout? LandingLayout : Fragment

    return(
        <>
        {/* <LandingWrapper> */}
            <MainWrapper>{children}</MainWrapper>
        {/* </LandingWrapper> */}
        </>
    )

}


export default function Router() {

    return (
        <>
            <BrowserRouter>

                <Routes>
                    {allRoutes.map((values) =>(
                        <Route key={values.id}
                        path={values.path}
                            element={
                            
                            <MainLayoutWrapper
                                routes={values}
                            >
                            <Suspense fallback={<p>Loadinh</p>}>
                                <values.element  />
                            </Suspense>
                            </MainLayoutWrapper>}
                        />

                    ))

                    }
                </Routes>
            </BrowserRouter>

        </>
    )
}
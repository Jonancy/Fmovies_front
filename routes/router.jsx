import React, { Fragment } from "react";
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import allRoutes from "./allRoutes";
import MainLayout from "../layouts/mainLayout";
import LandingLayout from "../layouts/landingLayout";


function MainLayoutWrapper({routes, children}) {

    const MainWrapper = routes.hasLayout? MainLayout : Fragment

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
                                <values.element />
                            </MainLayoutWrapper>}
                        />

                    ))

                    }
                </Routes>
            </BrowserRouter>

        </>
    )
}
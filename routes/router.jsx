import React, { Fragment, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import allRoutes from "./mainRoute/allRoutes";
import AdminLayout from "../layouts/admin/adminLayout";
import MainLayout from "../layouts/home/mainLayout";
import Error404Layout from "../layouts/error/error404Layout";
import LandingPage from "../pages/landingPage";
import LandingLayouts from "../layouts/landingLayout/landingLayout";
import { SkeletonTheme } from "react-loading-skeleton";
import AuthLayout from "../layouts/auth/authLayout";

//!This layout is for main page for like home, movies etc.
function MainLayoutWrapper({ routes, children }) {
  //!If the element or URL dosent have its path then the error 404 element will handle it by * as its path as it catches all the unmatched routes like unknown paths and displays the error404 page
  const MainWrapper = routes.hasLayout && MainLayout;

  //!Not needed if the page needs sign up or login first then you can do that
  // const LandingWrapper = routes.hasLayout? LandingLayout : Fragment

  return (
    <>
      {/* <LandingWrapper> */}
      <MainWrapper>{children}</MainWrapper>
      {/* </LandingWrapper> */}
    </>
  );
}

//!This is for admin layout
function AdminLayoutWrapper({ routes, children }) {
  const AdminWrapper = routes.hasLayout && AdminLayout;

  return (
    <>
      <AdminWrapper>{children}</AdminWrapper>
    </>
  );
}

//!This is for error 404
function ErrorLayout({ routes, children }) {
  const ErrorPage = routes.hasLayout && Error404Layout;

  return (
    <>
      <ErrorPage>{children}</ErrorPage>
    </>
  );
}

function LandingLayout({ routes, children }) {
  const LandingPage = routes.hasLayout && LandingLayouts;

  return (
    <>
      <LandingPage>{children}</LandingPage>
    </>
  );
}

function AuthLayouts({routes,children}){
  const AuthPage = routes.hasLayout && AuthLayout;

  return(
    <AuthPage >{children}</AuthPage>
  )
}

export default function Router() {
  return (
    <>
    <SkeletonTheme baseColor="#202020" highlightColor="#444"> 
      <BrowserRouter>
        <Routes>
          {allRoutes.map((values) => (
            <Route
              key={values.id}
              path={values.path}
              element={
                values.isErrorPage ? (
                  <ErrorLayout routes={values}>
                    <values.element />
                  </ErrorLayout>
                ) : values.isLandingPage ? (
                  <LandingLayout routes={values}>
                    <values.element />
                  </LandingLayout>
                ) : values.isAdmin ? (
                  <AdminLayoutWrapper routes={values}>
                    <values.element />
                  </AdminLayoutWrapper>
                ) :values.isAuthPage?(
                  <AuthLayouts routes={values}>
                    <values.element />
                  </AuthLayouts>
                ) :(
                  <MainLayoutWrapper routes={values}>
                    <Suspense fallback={<p>Loadinh</p>}>
                      <values.element />
                    </Suspense>
                  </MainLayoutWrapper>
                ) 
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
    </>
  );
}

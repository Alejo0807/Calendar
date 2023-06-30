/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom";   
import { LoginPage } from "../auth/pages";
import { CalendarPage } from "../calendar/";
import { getEnvVariables } from "../helpers";
import { useSelector } from "react-redux";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();
    
  useEffect(() => {
    checkAuthToken()
  }, [])
  
  return (

    <Routes>
      {
        (status === 'not-authenticated')
          ? (
              <>
                <Route path="/auth/*" element={ <LoginPage/> }/>
                <Route path="/*" element={ <Navigate to="/auth/login"/> }/>
              </>
            )
            : (
              <>
                <Route path="/" element={ <CalendarPage/> }/>
                <Route path="/*" element={ <Navigate to="/"/> }/>
              </>
            )
      }

      
    </Routes>
  )
}

/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom";   
import { LoginPage } from "../auth/pages";
import { CalendarPage } from "../calendar/";
import { getEnvVariables } from "../helpers";

export const AppRouter = () => {

  const authStatus = 'authenticated';

  console.log(getEnvVariables());
    
  return (

    <Routes>
      {
        (authStatus === 'not-authenticated')
          ? <Route path="/auth/*" element={ <LoginPage/> }/>
          : <Route path="/*" element={ <CalendarPage/> }/>
      }

      <Route path="/*" element={ <Navigate to="/auth/login"/> }/>
      
    </Routes>
  )
}

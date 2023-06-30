import { useDispatch, useSelector } from "react-redux"
import {calendarApi} from "../api";
import { onCheking, onClearErrorMessage, onLogin, onLogout, onRegister } from "../store/auth/authSlice";
import { onLogoutCalendar } from "../store";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth); 
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch(onCheking)
        try {
            const { data } = await calendarApi.post('/auth', { email, password })
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            if(data.ok) {
                dispatch(onLogin({ name: data.name, uid: data.uid}))
            }
        } catch (error) {
            console.log(error)
            const { response } = error;
            dispatch(onLogout(response.data.msg));
            setTimeout(() => {
                dispatch(onClearErrorMessage())
            }, 100)
            
        }
    }
    
    const startRegister = async({ name, email, password }) => {
        dispatch(onCheking)
        
        try {
            const { data } = await calendarApi.post('/auth/register', { name, email, password })
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            if(data.ok) {
                dispatch(onRegister({ name: data.name, uid: data.uid}))
            }
        } catch (error) {
            console.log(error)
            const { response } = error;
            dispatch(onLogout(response.data.msg));
            setTimeout(() => {
                dispatch(onClearErrorMessage())
            }, 100)
            
        }
    }

    const startLogout = async() => {
        dispatch(onLogoutCalendar());
        localStorage.clear()
        dispatch(onLogout('Logout'));
    } 

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogout('Missing token'));
        
        try {
            const { data } = await calendarApi.get('/auth/renew')
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid}))
        } catch (error) {
            dispatch(onLogout());
        }
    } 
    
    return {
        status,
        errorMessage,
        
        startLogin,
        startRegister,
        startLogout,
        checkAuthToken
    }

}

// test@test.com

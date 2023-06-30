
import React, { useEffect } from 'react'
import './LoginPage.css'
import { useAuthStore, useForm } from '../../hooks';
import Swal from 'sweetalert2';

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
};

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerConfirmPassword: ''
};

export const LoginPage = () => {

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
    
    const { registerName,
            registerEmail,
            registerPassword,
            registerConfirmPassword,
            onInputChange: onRegisterInputChange } = useForm(registerFormFields);

    const { startLogin, errorMessage, startRegister } = useAuthStore();

    useEffect(() => {
        if(errorMessage !== '' && errorMessage !== 'Missing token' && errorMessage !== 'Logout'){
            Swal.fire('Authentication error', errorMessage, 'error')
        }
    
    }, [errorMessage])
    

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({email: loginEmail, password: loginPassword});
    }
    const registerSubmit = (event) => {
        event.preventDefault();
        if(registerPassword !== registerConfirmPassword) {
            Swal.fire('Invalid password', 'Passwords don\'t match', 'error');
            return;
        }
        startRegister({
            name: registerName, 
            email: registerEmail, 
            password: registerPassword
        });
    }

  return (
    <div className="container login-container">
        <div className="row">
            <div className="col-md-6 login-form-1">
                <h3>Ingreso</h3>
                <form onSubmit={ loginSubmit }>
                    <div className="form-group mb-2">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Correo"
                            name='loginEmail'
                            value={ loginEmail }
                            onChange={ onLoginInputChange }
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            name='loginPassword'
                            value={ loginPassword }
                            onChange={ onLoginInputChange }
                        />
                    </div>
                    <div className="d-grid gap-2">
                        <input 
                            type="submit"
                            className="btnSubmit"
                            value="Login" 
                        />
                    </div>
                </form>
            </div>

            <div className="col-md-6 login-form-2">
                <h3>Registro</h3>
                <form onSubmit={ registerSubmit }>
                    <div className="form-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            name='registerName'
                            value={ registerName }
                            onChange={ onRegisterInputChange }
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name='registerEmail'
                            value={ registerEmail }
                            onChange={ onRegisterInputChange }
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            name='registerPassword'
                            value={ registerPassword }
                            onChange={ onRegisterInputChange }
                        />
                    </div>

                    <div className="form-group mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password" 
                            name='registerConfirmPassword'
                            value={ registerConfirmPassword }
                            onChange={ onRegisterInputChange }
                        />
                    </div>

                    <div className="d-grid gap-2">
                        <input 
                            type="submit" 
                            className="btnSubmit" 
                            value="Create Account" />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

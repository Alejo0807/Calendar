
import React from 'react'
import { useAuthStore } from '../../hooks';

export const Navbar = () => {

  
  const { startLogout } = useAuthStore();

  const onSignOut = () => {
    startLogout();
  }

  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-4'>
        <span className='navbar-brand'>
            <i className="fas fa-calendar">
                &nbsp;
                Alejandro
            </i>
        </span>

        <button className='btn btn-outline-danger' onClick={ onSignOut }>
            <i className='fas fa-sign-out-alt'></i>
            &nbsp;
            <span>Salir</span>
        </button>
    </div>
  )
}

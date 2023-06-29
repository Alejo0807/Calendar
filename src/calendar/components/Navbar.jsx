
import React from 'react'

export const Navbar = () => {
  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-4'>
        <span className='navbar-brand'>
            <i className="fas fa-calendar">
                &nbsp;
                Alejandro
            </i>
        </span>

        <button className='btn btn-outline-danger'>
            <i className='fas fa-sign-out-alt'></i>
            &nbsp;
            <span>Salir</span>
        </button>
    </div>
  )
}

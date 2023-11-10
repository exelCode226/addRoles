import React from 'react'
import { useAuth } from '../../context/authContext'

export default function Footer() {
  const { isAuthenticated } = useAuth()


  if (isAuthenticated) {
    return (
      <footer className="main-footer fixed-bottom">
        <strong>Versión de prueba Developing Geek</strong>
        <div className="float-right d-none d-sm-inline-block">
          <b>Versión 3.7</b>
        </div>
      </footer>

    )
  } else {
    return null;
  }
}

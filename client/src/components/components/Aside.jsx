import React from 'react'
import { useAuth } from '../../context/authContext'
import { Link } from 'react-router-dom'



export default function Aside() {
  const { isAuthenticated, user } = useAuth()


  let nombreTitle = '';

  switch (location.pathname) {
    case '/users':
      nombreTitle = 'Propietario';
      break;
    default:
        nombreTitle = ''
      }
    


  if (isAuthenticated) {
    return (
      <div className='shadowAside'>
        <aside className="asidecss main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a title='Nombre de usuario' href="" className="brand-link">
            <img src="https://th.bing.com/th/id/R.8ac32247336ea31ea4c7922e58324edd?rik=Z8d%2fuxDBhBSR2w&pid=ImgRaw&r=0" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
            {/* <span className="brand-text font-weight-light">{user.nombre}</span> */}
            <span className="brand-text font-weight-light">{nombreTitle ? nombreTitle : user.nombre}</span>

          </a>
          {/* Sidebar */}
          <div className="sidebar">



            {/* Sidebar user panel (optional) */}
            {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="/profile" className="d-block"> {user.nombre}</a>
            </div>
          </div> */}
            {/* SidebarSearch Form */}
            {/* <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div> */}
            {/* Sidebar Menu */}



            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

                <li title="Ir a empleados" className="nav-item">
                  <p className="nav-link">
                    <i className="nav-icon fas fa-user-plus" />
                    <p>
                      <Link to="/empleados">Empleados</Link>
                    </p>
                  </p>
                </li>



                <li to="products" title='Ir a productos' className="nav-item">
                  <p className="nav-link">
                    <i className="nav-icon fas fa-shopping-cart" />
                    <p>
                      <Link to="products" >Productos</Link>

                    </p>
                  </p>
                </li>


                {/* <li className="nav-item">
                <a href="/tasks" className="nav-link">
                  <i className="nav-icon fas fa-tasks" />
                  <p>
                    Tareas
                  </p>
                </a>

              </li> */}


                <li title='Ir a actividades' className="nav-item">
                  <p className="nav-link">
                    <i className="nav-icon fas fa-newspaper" />
                    <p>
                      <Link to="/actividades" >Actividades</Link>
                    </p>
                  </p>
                </li>



                <li title='Ir a pedidos' className="nav-item">
                  <p className="nav-link">
                    <i className="nav-icon fas fa-list-ul" />
                    <p>
                      <Link to="/pedidos">Pedidos</Link>
                    </p>
                  </p>
                </li>


                <li title='Ir a clientes' className="nav-item">
                  <p className="nav-link">
                    <i className="nav-icon fas fa-users" />
                    <p>
                      <Link to="/clientes" >Clientes</Link>
                    </p>
                  </p>
                </li>

                <li to="products" title='Ir a productos' className="nav-item">
                  <p className="nav-link">
                    <i className="nav-icon fas fa-shopping-cart" />
                    <p>
                      <Link to="/programaciones" >Programaciones</Link>

                    </p>
                  </p>
                </li>

                <li title="Ir a Usuarios" className="nav-item">
                  <p className="nav-link">
                    <i className="nav-icon fas fa-user-plus" />
                    <p>
                      <Link to="/users">Usuarios</Link>
                    </p>
                  </p>
                </li>
                
                <li title="Ir a Usuarios" className="nav-item">
                  <p className="nav-link">
                    <i className="nav-icon pie-chart-outline" />
                    <p>
                      <Link to="/dashboard">Dashboard</Link>
                    </p>
                  </p>
                </li>
                



              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>

    )
  } else {
    return null;
  }



}


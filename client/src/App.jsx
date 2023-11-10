import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProtectedRoute } from "./routes";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import LoginPage from "./pages/LoginPage"
import { TasksPage } from "./pages/TasksPage";
import { TaskProvider } from "./context/tasksContext";
import { EmpleadoProvider } from "./context/empleadoContext";
import { EmpleadoFormPage } from "./pages/EmpleadoFormPage";
import {EmpleadosPage} from "./pages/EmpleadosPage"
import { ProductsPage } from "./pages/ProductsPage";
import { ProductProvider } from "./context/productsContext";
// import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import Header from './components/components/Header'
import Aside from './components/components/Aside'
import Footer from "./components/components/Footer";
import Profile from "./components/components/Profile";
import PasswordReset from "./pages/PasswordReset";
import ResetPassword from "./pages/ResetPassword";
import ProductFormPages from "./pages/ProductFormPages";
import { ActividadesPage } from "./pages/ActividadPage";
import {Manual} from "./pages/Manual"
import { ActividadFormPages } from "./pages/ActividadFormPage";
import { ActividadProvider } from "./context/actividadesContext";
import { ClientesPage } from "./pages/ClientesPage";
import { ClientesFormPage } from "./pages/ClientesFormPage";
import { ClientesProvider } from "./context/ClientesContext";
import { PedidosPage } from "./pages/pedidosPage";
import { PedidosFormPage } from "./pages/pedidosFormPage";
import { PedidoProvider } from "./context/pedidosContext"; // Asegúrate de importar correctamente
import { ProgramacionFormPage } from "./pages/ProgramacionFormPage";
import { ProgramacionProvider } from "./context/programacionesContext";
import { ProgramacionPage } from "./pages/ProgramacionPage";
import { UsuariosPage } from "./pages/UsuariosPage";
import DashboardPage from "./pages/DashboardPage";




export default function Content() {


  return (

<AuthProvider>
          <ProgramacionProvider>
    <ProductProvider>
      <ActividadProvider>
       <ClientesProvider>
         <PedidoProvider>
          <TaskProvider>
            <EmpleadoProvider>
              <BrowserRouter>

              {/* <div className="content-wrapper"> */}

              <Header />
              <Aside />

              <Routes>

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />



                <Route exact path="/send-password-reset-email" element={<PasswordReset />} />
                <Route exact path="/reset-password/:token" element={<ResetPassword />} />




                <Route element={<ProtectedRoute />}>

                  <Route path="/" element={<HomePage />} />

                  {/* Rutas relacionadas con tareas */}
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/add-task" element={<TaskFormPage />} />
                  <Route path="/tasks/:id" element={<TaskFormPage />} />

                  {/* Rutas relacionadas con empleados */}
                  <Route path="/empleados" element={<EmpleadosPage />} />
                  <Route path="/add-empleado" element={<EmpleadoFormPage />} />
                  <Route path="/empleados/:id" element={<EmpleadoFormPage />} />

                  {/* Rutas relacionadas con productos */}
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/add-product" element={<ProductFormPages />} />
                  <Route path="/products/:id" element={<ProductFormPages />} />

                  
                  {/* Rutas relacionadas con actividades */}
                  <Route path="/actividades" element={<ActividadesPage />} />
                  <Route path="/add-actividades" element={<ActividadFormPages />} />
                  <Route path="/actividades/:id" element={<ActividadFormPages />} />                  

                   {/* Clientes rutas */}
                  <Route path="/clientes" element={<ClientesPage />} />
                  <Route path="/add-cliente" element={<ClientesFormPage />} />
                  <Route path="/clientes/:id" element={<ClientesFormPage />} />

                    {/* Pedidos rutas */}
                  <Route path="/pedidos" element={<PedidosPage />} />
                  <Route path="/add-pedido" element={<PedidosFormPage />} />
                  <Route path="/pedidos/:id" element={<PedidosFormPage />} />

                  {/* Programación rutas */}
                  <Route path="/programaciones" element={<ProgramacionPage />} />
                  <Route path="/add-programacion" element={<ProgramacionFormPage/>} />
                  <Route path="/programaciones/:id" element={<ProgramacionFormPage />} />

                  {/* Otras rutas protegidas */}
                  <Route path="/manual" element={<Manual/>} />
                  <Route path="/dashboard" element={<DashboardPage />} />


                </Route>

              </Routes>


              {/* </div> */}


                  </BrowserRouter>
                </EmpleadoProvider>
              </TaskProvider>
            </PedidoProvider>
          </ClientesProvider>
        </ActividadProvider>
      </ProductProvider>
              </ProgramacionProvider>
      <Footer />
    </AuthProvider>

  )
}

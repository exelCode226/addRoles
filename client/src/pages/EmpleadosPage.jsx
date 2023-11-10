import React, { useEffect, useState } from "react";
import { useEmpleados } from "../context/empleadoContext";
import { ImFileEmpty } from "react-icons/im";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ui";
import { Button, FormControl, FormControlLabel, IconButton, Input, InputLabel, Paper, Switch } from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';


export function EmpleadosPage() {
  const { empleados, getEmpleados, deleteEmpleado } = useEmpleados();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");



  const pageSize = 5; // Cantidad de elementos por página



  useEffect(() => {
    // Llama a getEmpleados dentro del useEffect para obtener los datos
    getEmpleados();
  }, []);

  const filteredEmpleados = empleados.filter(
    (empleado) =>
      empleado.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.identify.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.typeEmpl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredEmpleados.length / pageSize);
  const paginatedEmpleados = filteredEmpleados.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteEmpleado = (empleadoId) => {
    if (window.confirm("¿Está seguro que desea eliminar este empleado?")) {
      deleteEmpleado(empleadoId);
    }
  };

  return (
    <>

      <div className="content-wrapper">

        <h2 className="text-primary text-center tituModus">Empleados</h2>

        <div className="buscadorYboton">


          <div className="buscar-pagina">

            <div className="buscadorPedidos">





              <Input
                title="Buscar en la tabla"
                className="buscar"
                id="search-input"
                type="text"
                placeholder="Buscar empleado"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                endAdornment={<IconButton aria-label="search"></IconButton>}
              />

            </div>

          </div>

          <div title="Agregar empleado">
            <ButtonLink to="/add-empleado"><div className="btn btn-primary">Agregar empleado</div></ButtonLink>
          </div>

        </div>



        {empleados.length === 0 ? (

          <div className="flex justify-center items-center p-10">
            <div>
              <ButtonLink to="/add-empleado"><div className="btn btn-primary">Agregar empleado</div></ButtonLink>
            </div>

            <div>
              <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
              <h1 className="font-bold text-xl">
                No hay empleados en este momento.
              </h1>
            </div>
          </div>
        ) : (
          <div className="content">


            <table className="table table-hover justify-center text-center">

              <thead>
                <tr className="bg-primary">
                  <th className="">Documento</th>
                  <th className="">Nombre</th>
                  <th className="">Especialidad</th>
                  <th className="">Estado</th>
                  <th className="">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmpleados.map((empleado) => (
                  <tr key={empleado._id}>
                    <td className="text-black">{empleado.identify}</td>
                    <td className="text-black">{empleado.username}</td>
                    <td className="text-black">{empleado.typeEmpl}</td>
                    <td>
                      {/* <FormControlLabel
                        title="Estados Empleados"
                        control={
                          <Switch sx={{ m: 0.00002 }} defaultChecked={empleado.isActive}/>
                        }
                      /> */}
                      <Switch sx={{ m: 0.00002 }} defaultChecked={empleado.isActive} />
                    </td>
                    <td>

                      <Link to={`/empleados/${empleado._id}`} >
                        <button title="Editar empleado" className="btn btn-warning mx-2 py-1 ">
                          <EditIcon />
                        </button>
                      </Link>

                      <button onClick={() => handleDeleteEmpleado(empleado._id)} title="Eliminar empleado" className="btn btn-danger py-1">
                        <DeleteIcon />
                      </button>


                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  title="Identificador paginación"
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`${currentPage === index + 1 ? "bg-blue-500" : "bg-gray-300"
                    } text-white p-2 mx-1 rounded`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>


      <Toaster
        position="top-right"
        reverseOrder={false}
      />

    </>
  );
}

export default EmpleadosPage;
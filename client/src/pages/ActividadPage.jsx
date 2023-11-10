import React, { useEffect, useState } from "react";
import { useActividades } from "../context/actividadesContext";
import { ImFileEmpty } from "react-icons/im";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ui";
// import CustomizedSwitches from "../components/ui/Switch";
import { FormControl, IconButton, Input, InputLabel, Paper } from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';



export function ActividadesPage() {
  const { actividades, getActividades, deleteActividad } = useActividades();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 6; // Cantidad de elementos por página

  useEffect(() => {
    getActividades();
  }, []);

  const filteredActividades = actividades.filter(
    (actividad) =>
      actividad.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredActividades.length / pageSize);
  const paginatedActividades = filteredActividades.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteEmpleado = (actividadId) => {
    if (window.confirm("¿Está seguro que desea eliminar este pedido?")) {
      deleteActividad(actividadId);
    }
  }

  return (
    <>
      <div className="content-wrapper">

        <h2 className="text-uppercase text-primary text-center tituModus">Actividades</h2>



        {actividades.length === 0 ? (
          <div className="flex justify-center items-center p-10">
            <div>
              <ButtonLink to="/add-actividades"><div className="btn btn-primary">Agregar actividad</div></ButtonLink>
            </div>
            <div>
              <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
              <h1 className="font-bold text-xl">
                No hay actividades en este momento.
              </h1>
            </div>
          </div>
        ) : (

          <div>
            <div className="content">



              <div className="buscadorYboton">


                <div className="buscar-pagina">

                  <div className="buscadorPedidos">

                    <Input
                      id="search-input"
                      type="text"
                      placeholder="Buscar actividad"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      endAdornment={
                        <IconButton aria-label="search">
                          {/* Icono de búsqueda */}
                        </IconButton>
                      }
                    />

                  </div>
                </div>



                <div>
                  <ButtonLink to="/add-actividades"><div className="btn btn-primary">Agregar actividad</div></ButtonLink>
                </div>

              </div>






              <div>

                <table className="table table-hover justify-center text-center">

                  <thead >
                    <tr className="bg-primary">
                      <th className="">Nombre Actividad</th>
                      <th className="">Valor Actividad</th>
                      {/* <th className="text-black">Nombre Productos</th> */}
                      {/* <th className="text-black">Descripcion Productos</th> */}
                      <th className="">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedActividades.map((actividad) => (
                      <tr key={actividad._id}>
                        <td className="text-black">{actividad.nombre}</td>
                        <td className="text-black">{actividad.precioA}</td>
                        {/* <td className="text-black">
                          {actividad.productos
                            ? actividad.productos.nombre
                            : "Producto no encontrado"}
                        </td>
                        <td className="text-black">
                    {actividad.productos
                      ? actividad.productos.descripcion
                      : "Producto no encontrado"}
                  </td> */}
                        <td>


                          <Link to={`/actividades/${actividad._id}`} >
                            <button title="Editar cliente" className="btn btn-warning mx-2 py-1 ">
                              <EditIcon />
                            </button>
                          </Link>


                          <button onClick={() => handleDeleteEmpleado(actividad._id)} title="Eliminar cliente" className="btn btn-danger py-1">
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

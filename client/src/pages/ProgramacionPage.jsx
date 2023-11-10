import { useEffect, useState } from "react";
import { useProgramaciones } from "../context/programacionesContext";
// import {ImFileEmpty} from "react-icons/im"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputLabel,
  Paper,
  Switch,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ui";
import "../components/styles/register.css";
import toast, { Toaster } from 'react-hot-toast';
import { ImFileEmpty } from "react-icons/im";

export function ProgramacionPage() {
  const { programaciones, getProgramacion } = useProgramaciones();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 5; // Cantidad de elementos por página
  const { deleteProgramacion } = useProgramaciones();
  useEffect(() => {
    getProgramacion();
  }, []);

  const filteredProgramaciones = programaciones.filter(
    (programacion) =>
      programacion.empleado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      programacion.producto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredProgramaciones.length / pageSize);
  const paginatedProgramacion = filteredProgramaciones.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteEmpleado = (programacionId) => {
    if (window.confirm("¿Está seguro que desea eliminar esta programación?")) {
      deleteProgramacion(programacionId);
    }
  }

  return (
    <>

      <div className="content-wrapper">

        <h2 className="text-primary text-center tituModus">Programación</h2>


        {programaciones.length === 0 ? (

          <div>

            <div>
              <ButtonLink to="/add-programacion"><div className="btn btn-primary">Agregar programación</div></ButtonLink>
            </div>

            <div className="flex justify-center items-center p-10">

              <div>
                 <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" /> 
                <h1 className="font-bold text-xl">
                  No hay nada programado en este momento.
                </h1>
              </div>
            </div>
          </div>
        ) : (

          <div>

            <div className="buscar-pagina">

              <div className="buscadorProgramacion">
                <Input
                  className="buscar"
                  id="search-input"
                  type="text"
                  placeholder="Buscar programación"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                <ButtonLink to="/add-programacion"><div className="btn btn-primary">Agregar programación</div></ButtonLink>
              </div>

            </div>

            <table className="table table-hover justify-center text-center">

              <thead>
                <tr className="bg-primary">
                  <th className="">Empleados</th>
                  <th className="">Productos</th>
                  <th className="">Acciones</th>
                </tr>
              </thead>
              <tbody>
                 {paginatedProgramacion.map((programacion) => ( 
                <tr key={programaciones._id}>
                  <td className="text-black">
                    {programaciones.empleado}
                    {/* {programacion.empleado &&
                      programacion.empleado.map(items => `${items.username} `)} */}
                  </td>
                  <td className="text-black">{programaciones.producto}</td>

                  <td>

                    <Link to={`/programaciones/${programaciones._id}`} >
                      <button title="Editar cliente" className="btn btn-warning mx-2 py-1 ">
                        <EditIcon />
                      </button>
                    </Link>


                    <button onClick={() => handleDeleteEmpleado(programaciones._id)} title="Eliminar cliente" className="btn btn-danger py-1">
                      <DeleteIcon />
                    </button>

                  </td>
                </tr>
                 ))} 
              </tbody>
            </table>
             <div className="paginationTd">
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
        )}
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  );
}



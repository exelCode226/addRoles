import React, { useEffect, useState } from "react";

import { useAuth } from "../context/authContext";
import { ImFileEmpty } from "react-icons/im";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ui";
import { FormControlLabel, IconButton, Input, Switch } from "@mui/material";
import axios from "axios";
import { getUsersRequest } from "../api/auth";
import DeleteIcon from "@mui/icons-material/Delete";


export function UsuariosPage() {
  const { getUsers, deleteUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [estadosActivos, setEstadosActivos] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUsers();
    deleteUser();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await getUsersRequest();
        if (fetchedUsers && fetchedUsers.length > 0) {
          setUsers(fetchedUsers);
        } else {
          setUsers([]); // O cualquier valor predeterminado que desees en caso de datos vacíos
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        setLoading(false);
      }
    };

    fetchData();

  }, []);



  const pageSize = 5; // Cantidad de elementos por página



  const filteredUsers = users.filter((user) =>
    user?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user?.documento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //   useEffect(()=>{
  //     getUsers()
  //   },[])


  const handleDeleteEmpleado = (userId) => {
    if (window.confirm("¿Está seguro que desea eliminar este usuario?")) {
      deleteProgramacion(userId);
    }
  }


  return (
    <>

      <div className="content-wrapper">

        <div>


          <h2 className="text-primary text-center tituModus">Gestión de usuarios</h2>

          <div className="buscadorYboton">


            <div className="buscar-pagina">

              <div className="buscadorPedidos">





                <Input
                  title="Buscador Atributos"
                  className="buscar"
                  id="search-input"
                  type="text"
                  placeholder="Buscar usuarios"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  endAdornment={<IconButton aria-label="search"></IconButton>}
                />

              </div>

            </div>


          </div>



          {users.length === 0 ? (

            <div className="flex justify-center items-center p-10">
              <div>
                <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
                <h1 className="font-bold text-xl">
                  No tienes permisos para ingresar a este apartado.
                </h1>
              </div>
            </div>
          ) : (
            <div className="content">


              <table className="table table-hover justify-center text-center">

                <thead>
                  <tr className="bg-primary">
                    <th className="">Nombre</th>
                    <th className="">Documento</th>
                    <th className="">Tipo De Empleado</th>
                    <th className="">Email</th>
                    <th className="">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr key={user._id}>
                      <td className="text-black">{user?.nombre}</td>
                      <td className="text-black">{user?.documento}</td>
                      {/* <td className="text-black">{user.roles}</td> */}
                      <td className="text-black">
                        {user.roles
                          ? user.roles.map(items => `${items.name} `)
                          : "rol no encontrado"}
                      </td>
                      <td className="text-black">{user?.email}</td>


                      <td>
                        
                        <Link to={`/users/${user._id}`} >
                          <button title="Editar usario" className="btn btn-warning mx-2 py-1 ">
                            <EditIcon />
                          </button>
                        </Link>


                        <button onClick={() => handleDeleteEmpleado(user._id)} title="Eliminar cliente" className="btn btn-danger py-1">
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
                    title="Identificador Paginacion"
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
      </div>

    </>
  );
}

import { useEffect, useState } from "react";
import { usePedidos } from "../context/pedidosContext";
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
import toast, { Toaster } from 'react-hot-toast';
import "../components/styles/register.css";

export function PedidosPage() {
  const { pedidos, getPedidos } = usePedidos();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 5; // Cantidad de elementos por página
  const { deletePedido } = usePedidos();
  useEffect(() => {
    getPedidos();
  }, []);


  const nombres = pedidos.map(pedido => {
    const clienteDelPedido = pedido.cliente[0];
    return clienteDelPedido.nombreCompleto.toLowerCase(); // Convertir a minúsculas aquí
});
console.log(nombres)
const filteredPedidos = pedidos.filter(pedido =>
    nombres.includes(searchTerm.toLowerCase()) ||
    pedido.fecha_aprox.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pedido.especificaciones.toLowerCase().includes(searchTerm.toLowerCase())
    
);

console.log(filteredPedidos);


  const pageCount = Math.ceil(filteredPedidos.length / pageSize);
  const paginatedPedidos = filteredPedidos.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteEmpleado = (pedidoId) => {
    if (window.confirm("¿Está seguro que desea eliminar este pedido?")) {
      deletePedido(pedidoId);
    }
  }



  return (
    <>

      <div className="content-wrapper">

        <h2 className="text-primary text-center tituModus">Pedidos</h2>


        {pedidos.length === 0 ? (

          <div>

            <div>
              <ButtonLink to="/add-pedido"><div className="btn btn-primary">Agregar pedido</div></ButtonLink>
            </div>

            <div className="flex justify-center items-center p-10">

              <div>
                {/* <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" /> */}
                <h1 className="font-bold text-xl">
                  No hay pedidos en este momento.
                </h1>
              </div>
            </div>
          </div>
        ) : (


          <div>


            <div className="buscar-pagina">

              <div className="buscadorPedidos">
                <Input
                  className="buscar"
                  id="search-input"
                  type="text"
                  placeholder="Buscar pedido"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                <ButtonLink to="/add-pedido"><div className="btn btn-primary">Agregar pedido</div></ButtonLink>
              </div>

            </div>

            <table className="table table-hover justify-center text-center">

              <thead>
                <tr className="bg-primary">
                  <th className="">Cliente</th>
                  <th className="">Producto</th>
                  <th className="">Cantidad</th>
                  <th className="">Fecha aproximada</th>
                  <th className="">Especificaciones</th>
                  <th className="">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPedidos.map((pedido) => (
                  <tr key={pedido._id}>
                    <td className="text-black">
                      {pedido.cliente
                        ? pedido.cliente.map(items => `${items.nombreCompleto} `)
                        : "Cliente no encontrado"}
                    </td>
                    {/* <td className="text-black">
                      {pedido.productos
                        ? pedido.productos.map((items) => (
                            <div >
                              <p>{items.pruducto.nombre}</p>
                            </div>
                          ))
                        : "producto no encontrado"}
                    </td> */}
                    <td className="text-black">
                      {pedido.productos
                        ? pedido.productos.map((items) => (
                          <div key={items._id}>
                            <p>{items.producto ? items.producto.nombre : 'Nombre no encontrado'}</p>
                          </div>
                        ))
                        : "Productos no encontrados"}
                    </td>
                    <td className="text-black">
                      {pedido.productos
                        ? pedido.productos.map((items) => (
                          <div >
                            <p>{items.cantidad}</p>
                          </div>
                        ))
                        : "cantidad no encontrada"}
                    </td>

                    <td className="text-black">{pedido.fecha_aprox}</td>
                    <td className="text-black">{pedido.especificaciones}</td>
                    <td>

                      <Link to={`/pedidos/${pedido._id}`} >
                        <button title="Editar cliente" className="btn btn-warning mx-2 py-1 ">
                          <EditIcon />
                        </button>
                      </Link>


                      <button onClick={() => handleDeleteEmpleado(pedido._id)} title="Eliminar cliente" className="btn btn-danger py-1">
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
        )}
      </div>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

    </>
  );
}



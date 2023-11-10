import { useState, useEffect } from "react";
import { useProducts } from "../context/productsContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ui";
import { FormControl, IconButton, Input, InputLabel, Paper } from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';

export function ProductsPage() {
  const { products, getProducts, deleteProduct } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 5; // Cantidad de elementos por página

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteEmpleado = (productId) => {
    if (window.confirm("¿Está seguro que desea eliminar este producto?")) {
      deleteProduct(productId);
    }
  };


  return (
    <>
      <div className="content-wrapper">
        

        <h2 className="text-uppercase text-primary text-center tituModus">Productos</h2>


        {products.length === 0 ? (
          <div className="flex justify-center items-center p-10">
            <div>
                <ButtonLink to="/add-product"><div className="btn btn-primary">Agregar producto</div></ButtonLink>
              </div>
            <div>
              {/* <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" /> */}
              <h1 className="font-bold text-xl">
                No hay productos ingresados
              </h1>
            </div>
          </div>
        ) : (

          <div>


            <div className="buscar-pagina">

              <div className="buscadorPedidos">

                <Input
                  id="search-input"
                  type="text"
                  placeholder="Buscar producto"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  endAdornment={
                    <IconButton aria-label="search">
                      {/* Icono de búsqueda */}
                    </IconButton>
                  }
                />


              </div>


              <div>
                <ButtonLink to="/add-product"><div className="btn btn-primary">Agregar producto</div></ButtonLink>
              </div>

            </div>



            {products.length === 0 ? (

              <div className="flex justify-center items-center p-10">
                <div>
                  {/* <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" /> */}
                  <h1 className="font-bold text-xl">
                    No hay productos ingresados
                  </h1>
                </div>
              </div>
            ) : (
              <div className="content">


                <table className="table table-hover justify-center text-center">

                  <thead>
                    <tr className="bg-primary">
                      <th className="">Nombre</th>
                      <th className="">Descripción</th>
                      <th className="">Precio</th>
                      <th className="">Actividades</th>
                      <th className="">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedProducts.map((product) => (
                      <tr key={product._id}>
                        <td className="text-black">{product.nombre}</td>
                        <td className="text-black">{product.descripcion}</td>
                        <td className="text-black">{product.precio}</td>
                        <td className="text-black">
                          {product.actividades
                            ? product.actividades.map((items) => (
                              <div >
                                <p>{items.nombre}</p>
                              </div>
                            ))
                            : "actividad no encontrado"}
                        </td>
                        <td>

                          <Link to={`/products/${product._id}`} >
                            <button title="Editar producto" className="btn btn-warning mx-2 py-1 ">
                              <EditIcon />
                            </button>
                          </Link>


                          <button onClick={() => handleDeleteEmpleado(product._id)} title="Eliminar producto" className="btn btn-danger py-1">
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

          // </div>
        )}
      </div>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

    </>
  );
}


export default ProductsPage;
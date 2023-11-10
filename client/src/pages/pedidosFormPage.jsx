import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label, Select } from "../components/ui";
import { usePedidos } from "../context/pedidosContext";
import { useClientes } from "../context/ClientesContext";
import { useProducts } from "../context/productsContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { ButtonCancelar } from "../components/ui/ButtonCancelar";

// import { Alert } from "@mui/material";
import "../components/styles/register.css";

dayjs.extend(utc);

export function PedidosFormPage() {
  const { createPedido, getPedido, updatePedido } = usePedidos();

  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [result, setResult] = useState([]);
  const { clientes, getClientes } = useClientes([]);
  const { products, getProducts } = useProducts([]);
  const [productos, setProductos] = useState([
    {
      producto: "",
      cantidad: 0,
    },
  ]);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString();
    let day = today.getDate().toString();

    if (month.length === 1) {
      month = `0${month}`; // Agrega un cero al principio si el mes es de un solo dígito
    }

    if (day.length === 1) {
      day = `0${day}`; // Agrega un cero al principio si el día es de un solo dígito
    }

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    getClientes();
  }, []);
  useEffect(() => {
    getProducts();
  }, []);
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addProducto = () => {
    setProductos([...productos, { producto: "", cantidad: 0 }]);
  };

  const removeProducto = (index) => {
    const updatedProductos = [...productos];
    updatedProductos.splice(index, 1);
    setProductos(updatedProductos);
  };

  const onSubmit = async (data) => {
    const actuP = data.productos.map((producto) => ({
      ...producto,
      cantidad: parseInt(producto.cantidad), // Puedo poner el  ,10 si genera algun error
    }));
    let count = 0;
    result.forEach((element) => {
      if (element != undefined) {
        count++;
      }
    });
    if (count > 1) {
      data.productos = result;
    }
    console.log(count + " <- VALOR de length");
    console.log(data);
    try {
      if (params.id) {
        updatePedido(params.id, {
          ...data,
          especificaciones: data.especificaciones
          .toLowerCase()
          .split(" ")
          .map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
          .join(" "),
          date: dayjs(data.date).utc().format(),
          productos: actuP,
          cantidad: actuP,
        });


        // setShowSuccessAlert2(true);
      } else {
        createPedido({
          ...data,
          especificaciones: data.especificaciones
          .toLowerCase()
          .split(" ")
          .map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
          .join(" "),
          date: dayjs(data.date).utc().format(),
          productos: actuP,
          cantidad: actuP,
        });
        // setShowSuccessAlert(true);
      }

      setTimeout(() => {
        navigate("/pedidos");
      }, 2800);


    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadPedido = async () => {
      if (params.id) {
        const pedido = await getPedido(params.id);
        setValue("cliente", pedido.cliente);
        setValue("productos", pedido.result);
        setValue("fecha_aprox", pedido.fecha_aprox);
        setValue("especificaciones", pedido.especificaciones);
      }
    };
    loadPedido();
  }, []);
  useEffect(() => {
    setResult([value1, value2]);
  }, [value2, value1]);

  return (
    <>
      <div className="">





        <div className="content-wrapper">




          <form onSubmit={handleSubmit(onSubmit)}>

            <section className="d-flex justify-content-between align-items-center">

              <Card>
                <div className="formLeft m-2">

                  <div className="text-center separadorForms">
                    <Label htmlFor="cliente">Cliente</Label>

                    <Select
                      id="cliente"
                      placeholder="Cliente"
                      name="cliente"
                      {...register("cliente", { required: true })}
                      autoFocus
                      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    >
                      <option disabled value="" selected>
                        Seleccionar un cliente
                      </option>
                      {clientes?.map((items, index) => {
                        return (
                          <option key={index} value={items._id}>
                            {items.nombreCompleto}
                          </option>
                        );
                      })}
                    </Select>
                    {errors.cliente && (
                      <p className="text-red-500">Seleccione el cliente</p>
                    )}
                  </div>






                  <div className="formRight">
                    <div className="text-center separadorForms">
                      <Label htmlFor="fecha_aprox">Fecha aproximada</Label>
                      <Input
                        type="date"
                        name="fecha_aprox"
                        placeholder="Fecha_aprox"
                        {...register("fecha_aprox", { required: true })}
                        autoFocus
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        min={getCurrentDate()} // Establece el atributo "min" con la fecha actual
                      />

                      {errors.fecha_aprox && (
                        <p className="text-red-500">
                          Ingrese la Fecha
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <Label htmlFor="especificaciones" className="">
                      Especificaciones
                    </Label>
                  </div>

                  <Textarea
                    name="especificaciones"
                    id="especificaciones"
                    rows="3"
                    placeholder="Especificaciones"
                    {...register("especificaciones", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                  />
                  {errors.especificaciones && (
                    <p className="text-red-500">
                      Ingrese las especificaciones.
                    </p>
                  )}

                </div>
              </Card>








              <Card>

                <div className="formRight">

                  <div className="d-flex justify-content-center align-items-center">
                    <label className="labelFormPedidos" htmlFor={`producto`}>Producto</label>
                    <label className="labelFormPedidos" htmlFor={`cantidad`}>Cantidad</label>
                  </div>

                  {productos.map((_, index) => (
                    <div className="text-center separadorForms flex" key={index}>

                      <div className="selectPedidos">

                        <Select
                          id={`producto_${index}`}
                          placeholder="Producto"
                          name={`productos[${index}].producto`}
                          {...register(`productos[${index}].producto`, { required: true })}
                          autoFocus
                          className="product"
                        >
                          <option disabled value="" selected>
                            Seleccionar un producto
                          </option>
                          {products?.map((items, innerIndex) => (
                            <option key={innerIndex} value={items._id}>
                              {items.nombre}
                            </option>
                          ))}
                        </Select>

                      {errors.productos && (
                        <p className="text-red-500">
                          Seleccione el producto
                        </p>
                      )}
                      </div>



                      <div className="selectPedidos">
                        <Input
                          type="number"
                          id={`cantidad`}
                          name={`productos[${index}].cantidad`}
                          placeholder="Cantidad"
                          {...register(`productos[${index}].cantidad`, { required: true })}
                          autoFocus
                          className="w-full px-1 py-2 rounded-md inputCantidad"
                          min="1"
                        />

                        {errors.cantidad && (
                          <p className="text-red-500">
                            Ingrese la cantidad
                          </p>
                        )}
                      </div>



                    </div>
                  ))}






                  <button type="button" onClick={addProducto} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2">
                    Agregar
                  </button>

                  <button type="button" onClick={removeProducto} className="w-full bg-red-500 text-white px-4 py-2 rounded-md my-2">
                    Eliminar
                  </button>

                </div>

              </Card>








            </section>

            <div className="">
              <Button>Guardar</Button>
              <ButtonCancelar onClick={() => navigate("/pedidos")}>Cancelar</ButtonCancelar>
            </div>


          </form>

        </div>

      </div>



      <Toaster
        position="top-right"
        reverseOrder={false}
      />

    </>
  );
}

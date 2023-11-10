import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Card, Input, Label, Button, Select } from "../components/ui";
import { useActividades } from "../context/actividadesContext";
import { useForm } from "react-hook-form";
import { Alert } from "@mui/material";
import { useProducts } from "../context/productsContext";
import toast, { Toaster } from 'react-hot-toast';
import { ButtonCancelar } from "../components/ui/ButtonCancelar";

dayjs.extend(utc);

export function ActividadFormPages() {
  const { createActividad, getActividad, updateActividad } = useActividades();

  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showSuccessAlert2, setShowSuccessAlert2] = useState(false);
  const { products, getProducts } = useProducts([]);
  useEffect(() => {
    getProducts();
  }, []);
  const onSubmit = async (data) => {
    try {
      const formattedDate = dayjs.utc(data.date).format();
      const actividadData = { ...data, date: formattedDate,
        nombre: data.nombre
        .toLowerCase()
        .split(" ")
        .map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
        .join(" "), };

      if (params.id) {
        await updateActividad(params.id, actividadData);
        setShowSuccessAlert2(true);
      } else {
        await createActividad(actividadData);
        setShowSuccessAlert(true);
      }

      setTimeout(() => {
        navigate("/actividades");
      }, 2800);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadActividades = async () => {
      
      if (params.id) {
        const actividad = await getActividad(params.id);
        setValue("nombre", actividad.nombre);
        setValue("precioA", actividad.precioA);
      }
    };
    
    loadActividades();
    
  }, []);
  return (

    <>

      <div className="cardCenter">
        <div className="content-wrapper">

          <div className="flex">


            <Card className="cardBro">
              {/* {showSuccessAlert && (
              <Alert variant="filled" severity="success">
                ¡Actividad ingresada con éxito!
              </Alert>
            )}
            {showSuccessAlert2 && (
              <Alert variant="filled" severity="success">
                ¡Actualizado con éxito!
              </Alert>
            )} */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor="nombre" >Nombre</Label>
                <Input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Nombre"
                  {...register("nombre", { required: true })}
                />
                {errors.nombre && (
                  <p className="text-red-500">
                    El nombre es requerido
                  </p>
                )}

                <Label htmlFor="precioA">Valor actividad</Label>
                <Input
                  min="0"
                  type="number"
                  name="precioA"
                  id="precioA"
                  placeholder="Valor actividad"
                  {...register("precioA", { required: true })}
                />
                {errors.precioA && (
                  <p className="text-red-500">
                    El valor de la actividad es requerido
                  </p>
                )}

                {/* <Label htmlFor="productos">Productos</Label> */}



                {/* <Select
                id="productos"
                name="productos"
                {...register("productos")}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              >
                {products?.map((items, index) => {
                  return (
                    <option key={index} value={items._id}>
                      {items.nombre}
                    </option>
                  );
                })}
              </Select> */}

                <div className="flex">
                  <Button>Guardar</Button>
                  <ButtonCancelar onClick={() => navigate("/actividades")}>Cancelar</ButtonCancelar>
                </div>

              </form>
            </Card>
          </div>
        </div>
      </div>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

    </>


  );
}



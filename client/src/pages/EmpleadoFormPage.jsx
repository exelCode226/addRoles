import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label, Select} from "../components/ui";
import { ButtonCancelar } from "../components/ui/ButtonCancelar";
import { useEmpleados } from "../context/empleadoContext";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';




dayjs.extend(utc);

export function EmpleadoFormPage() {


  const { createEmpleado, getEmpleado, updateEmpleado, errors: empleadoErrors } = useEmpleados();


  const navigate = useNavigate();

  const params = useParams();
  const { register, setValue, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (params.id) {
        await updateEmpleado(params.id, {
          ...data,
          username: data.username
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" "),
          date: dayjs.utc(data.date).format(),
        });

        setTimeout(() => {
          navigate("/empleados");
        }, 2800)

      } else {
        await createEmpleado({
          ...data,
          username: data.username
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" "),
          date: dayjs.utc(data.date).format(),

        });

        setTimeout(() => {
          navigate("/empleados");
        }, 2800)


      }
      
    

    } catch (error) {

      console.log(error);
      toast.error('Error al crear/actualizar empleado');
    }
  });


  useEffect(() => {
    const loadEmpleado = async () => {
      if (params.id) {
        const empleado = await getEmpleado(params.id);
        setValue("username", empleado.username);
        setValue("identify", empleado.identify);
        setValue("typeEmpl", empleado.typeEmpl);
        setValue(
          "date",
          empleado.date ? dayjs(empleado.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", empleado.completed)
      }
    };
    loadEmpleado();
  }, []);

  return (
    <>




      <div className="cardCenter">

        


        <div className="content-wrapper">

        {
        empleadoErrors.map((error, i) => (
          <div className='bg-red-500 p-2 text-center text-white content-center' key={i}>
            {error}
          </div>

        ))
      }



          <Card className="cardBro">

            <form onSubmit={onSubmit}>



              <Label htmlFor="username">Nombre completo</Label>
              <Input
                type="text"
                name="username"
                placeholder="Nombre Completo"{...register('username', { required: true })} />

              {errors.username && (<p className="text-red-500 ">Se requiere nombre completo</p>)}



              <Label htmlFor="identify">Documento</Label>
              <Input
                type="number"
                name="identify"
                placeholder="Documento"

                {...register('identify', { required: true })} />
              {errors.identify && (
                <p className="text-red-500">Se requiere el documento</p>

              )}

              <Label htmlFor="typeEmpl">Tipo de empleado</Label>
              <Select className="inputCompenent" title="Seleccionador tipo" name="typeEmpl" {...register('typeEmpl', { required: true })}>
                <option value="Varios">Varios</option>
                <option value="Tapicero">Tapicero</option>
                <option value="Esqueletero">Esqueletero</option>
              </Select>
              {errors.typeEmpl && (
                <p className="text-red-500"></p>
              )}

              {/* <Label htmlFor="date">Fecha</Label>
            <Input type="date" name="date" {...register("date")} /> */}
              <div className="flex">
                <Button>Guardar</Button>
                <ButtonCancelar onClick={() => navigate("/empleados")}>Cancelar</ButtonCancelar>
              </div>
            </form>
          </Card>
        </div>


      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

    </>

  );
}

export default EmpleadoFormPage;
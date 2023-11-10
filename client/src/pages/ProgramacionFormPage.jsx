// ProgramacionFormPage.js
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Label, Select } from "../components/ui";
import { useProgramaciones } from "../context/programacionesContext";
import { useEmpleados } from "../context/empleadoContext";
import { useProducts } from "../context/productsContext";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

dayjs.extend(utc);

export function ProgramacionFormPage() {
    const { createProgramacion, getIdProgramacion, updateProgramacion } = useProgramaciones();
    const { empleados, getEmpleados } = useEmpleados();
    const { products, getProducts } = useProducts();

    const navigate = useNavigate();
    const params = useParams();
    const {
        register,
        handleSubmit,
        setValue,
    } = useForm();

    useEffect(() => {
        getEmpleados();
        getProducts();
    }, []);

    const onSubmit = async (data) => {
        try {
            data.date = dayjs(data.date).utc().format();

            if (params.id) {
                await updateProgramacion(params.id, data);
            } else {
                await createProgramacion(data);
            }

            setTimeout(() => {
                navigate("/programaciones");
            }, 2800);
        } catch (error) {
            console.error(error);
            toast.error("Ocurrió un error al crear/actualizar la programación.");
        }
    };

    useEffect(() => {
        const loadProgramacion = async () => {
            if (params.id) {
                const programacion = await getIdProgramacion(params.id);
                setValue("Empleado", programacion.empleado);
                setValue("productos", programacion.producto);
           
            }
        };
        loadProgramacion();
    }, [params.id, getIdProgramacion, setValue]);

    return (
        <>
            <div className="cardCenter">
                <div className="content-wrapper">
                    <div>
                        <Card>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex">
                                    <div className="text-center separadorForms">
                                        <Label htmlFor="empleado">Empleado</Label>
                                        <Select
                                            id="empleado"
                                            name="empleado"
                                            {...register("empleado")}
                                            autoFocus
                                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                                        >
                                            <option value="" disabled>
                                                Seleccionar un empleado
                                            </option>
                                            {empleados.map((empleado) => (
                                                <option key={empleado._id} value={empleado._id}>
                                                    {empleado.username}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="text-center separadorForms">
                                        <Label htmlFor="producto">Producto</Label>
                                        <Select
                                            id="producto"
                                            name="producto"
                                            {...register("producto")}
                                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                                        >
                                            <option value="" disabled>
                                                Seleccionar un producto
                                            </option>
                                            {products.map((product) => (
                                                <option key={product._id} value={product._id}>
                                                    {product.nombre}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                   
                                </div>
                                <div title="Guardar programación">
                                    <Button>Guardar</Button>
                                    
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
            <Toaster 
                position="too-rigth"
                reverseOrder={false}
            />
        </>
    );
}

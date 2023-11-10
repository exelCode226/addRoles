import { createContext, useContext, useState, useEffect } from "react";
import { getProgramacionesRequest, getProgramacionIdRequest, createProgramacionRequest, deleteProgramacionRequest, updateProgramacionRequest } from "../api/programacion";
import { EmpleadoProvider } from "./empleadoContext";
import { ProductProvider } from "./productsContext";
import toast, { Toaster } from "react-hot-toast";



const programacionesContext = createContext();

export const useProgramaciones = () => {
    const context = useContext(programacionesContext);
    if (!context) throw new Error("use programaciones must be used within a programacionesProvider ");
    return context;
}


export function ProgramacionProvider({ children }) {
    const [programaciones, setProgramaciones] = useState([]);
    const [errors, setErrors] = useState([])



    const getProgramacion = async () => {
        try {

            const res = await getProgramacionesRequest();

            console.log(res.data);

            // Agrega este log
            setProgramaciones(res.data);

        } catch (error) {
            setErrors(error.response.data)
        }
    };

    const deleteProgramacion = async (id) => {
        try {
            const res = await deleteProgramacionRequest(id);
            if (res.status === 204) setProgramaciones(programaciones.filter((programaciones) => programaciones._id !== id));
            toast.success("Programación eliminada exitosamente");

        } catch (error) {
            setErrors([error.response.data.message])
            toast.error('No se puede eliminar');
        }
    };

    const createProgramacion = async (programaciones) => {
        try {
            const res = await createProgramacionRequest(programaciones);
            console.log(res.data);
            // Llama a la función para obtener la lista actualizada
            toast.success('Programación exitosa');
        } catch (error) {
            console.error(error);
            // setErrors(error.response.data)
        }
    };
    
  
    const getIdProgramacion = async (id) => {
        try {
            const res = await getProgramacionIdRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateProgramacion = async (id, updatedProgramacion) => {
        try {
            await updateProgramacionRequest(id, updatedProgramacion);
            toast.success('Programación actualizada exitosamente');
        } catch (error) {
            setErrors(error.response.data)
        }
    };


    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 2200)
            return () => clearTimeout()
        }
    }, [errors])

    return (
        <EmpleadoProvider>
            <ProductProvider>
                <programacionesContext.Provider
                    value={{
                        programaciones,
                        getProgramacion,
                        deleteProgramacion,
                        createProgramacion,
                        getIdProgramacion,
                        updateProgramacion,
                        errors,
                    }}
                >
                    {children}
                </programacionesContext.Provider>
            </ProductProvider>
        </EmpleadoProvider>
    );
}

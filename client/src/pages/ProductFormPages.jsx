import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Card, Input, Label, Button, Select } from "../components/ui";
import { useProducts } from "../context/productsContext";
import { useActividades } from "../context/actividadesContext";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { ButtonCancelar } from "../components/ui/ButtonCancelar";

dayjs.extend(utc);

export function ProductFormPages() {
  const { createProduct, getProduct, updateProduct } = useProducts();
  const { actividades, getActividades } = useActividades([]);
  const [selectedActividades, setSelectedActividades] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);

  const addActividad = () => {
    setSelectedActividades([...selectedActividades, ""]);
  };

  const removeActividad = () => {
    const updatedActividades = [...selectedActividades];
    updatedActividades.pop(); // Eliminamos la última actividad
    setSelectedActividades(updatedActividades);
  };

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateProduct(params.id, {
          ...data,
          nombre: data.nombre
          .toLowerCase()
          .split(" ")
          .map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
          .join(" "),
          date: dayjs.utc(data.date).format(),
          actividades: selectedActividades,
        });
      } else {
        createProduct({
          ...data,
          nombre: data.nombre
          .toLowerCase()
          .split(" ")
          .map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
          .join(" "),
          date: dayjs.utc(data.date).format(),
          actividades: selectedActividades,
        });
      }

      setTimeout(() => {
        navigate("/products");
      }, 2800);
      
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      if (params.id) {
        const product = await getProduct(params.id);
        setSelectedActividades(product.actividades || []);
        setValue("nombre", product.nombre);
        setValue("descripcion", product.descripcion);
        setValue("precio", product.precio);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    loadProducts();
  }, [params.id, getProduct]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="cardCenter">
        <div className="content-wrapper">
          <Card className="mx-auto p-5 w-96" style={styles.card}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group" style={styles.formGroup}>
                <Label htmlFor="nombre" style={styles.label}>
                  Nombre
                </Label>
                <Input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Nombre"
                  {...register("nombre", {
                    required: "Este campo es requerido",
                  })}
                  style={styles.input}
                />
                {errors.nombre && (
                  <p className="text-red-500 text-xs italic">
                    {errors.nombre.message}
                  </p>
                )}
              </div>

              <div className="form-group" style={styles.formGroup}>
                <Label htmlFor="descripcion" style={styles.label}>
                  Descripción
                </Label>
                <Input
                  type="text"
                  name="descripcion"
                  id="descripcion"
                  placeholder="Descripción"
                  {...register("descripcion", {
                    required: "La descripción es requerida",
                  })}
                  style={styles.input}
                />
                {errors.descripcion && (
                  <p className="text-red-500 text-xs italic">
                    {errors.descripcion.message}
                  </p>
                )}
              </div>

              <div className="form-group" style={styles.formGroup}>
                <Label htmlFor="precio" style={styles.label}>
                  Precio
                </Label>
                <Input
                  type="number"
                  name="precio"
                  id="precio"
                  placeholder="Precio"
                  {...register("precio", {
                    required: "El precio es requerido",
                  })}
                  style={styles.input}
                />
                {errors.precio && (
                  <p className="text-red-500 text-xs italic">
                    {errors.precio.message}
                  </p>
                )}
              </div>

              {selectedActividades.map((actividad, index) => (
                <div className="text-center separadorForms" key={index}>
                  <Label htmlFor={`actividad${index}`}>Actividad</Label>
                  <Select
                    id={`actividad${index}`}
                    name={`actividades[${index}]`}
                    {...register(`actividades[${index}]`)}
                    value={actividad}
                    onChange={(e) => {
                      const updatedActividades = [...selectedActividades];
                      updatedActividades[index] = e.target.value;
                      setSelectedActividades(updatedActividades);
                    }}
                    autoFocus
                  >
                    <option disabled value="">
                      Seleccionar una actividad
                    </option>
                    {actividades?.map((item, innerIndex) => (
                      <option key={innerIndex} value={item._id}>
                        {item.nombre}
                      </option>
                    ))}
                  </Select>
                </div>
              ))}

              <button
                type="button"
                onClick={addActividad}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2"
              >
                Agregar Actividad
              </button>
              <button
                type="button"
                onClick={removeActividad}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-md my-2"
              >
                Eliminar Actividad
              </button>

              <div className="flex">
                <Button>Guardar</Button>
                <ButtonCancelar onClick={() => navigate("/products")}>Cancelar</ButtonCancelar>
              </div>
            </form>
          </Card>
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={false} />

    </>
  );
}

const styles = {
  card: {
    boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.5)",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  input: {
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "#007bff",
    marginTop: "1rem",
    alignSelf: "center",
  },
  label: {
    color: "black",
    fontSize: "medium",
  },
};

export default ProductFormPages;

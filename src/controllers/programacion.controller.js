import { programacionModel } from "../models/programacion.model.js";
import { ObjectId } from "mongodb";

export async function getProgramacion(req, res) {
  try {
    const programacion = await programacionModel
      .find()
      .populate("empleado", "username")
      .populate("producto", "nombre");
      console.log(programacion)

    res.json(programacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getIdProgramacion = async (req, res) => {
  try {
    const programacion = await programacionModel.findById(req.params.id);
    if (!programacion)
      return res.status(404).json({ message: "Programación no encontrada" });
    return res.json(programacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export function createProgramacion(req, res) {
  const { empleado, producto } = req.body;

  const NuevoProgramacion = new programacionModel({
    empleado,
    producto
  });

  NuevoProgramacion.save()
    .then((response) => {
      console.log(response + " Se creó correctamente");
      res.status(201).json(response); // 201 significa "Creado con éxito"
    })
    .catch((error) => {
      console.log("El error es: \n" + error);
      res.status(500).json({ message: error.message });
    });
}






export const updateProgramacion = async (req, res) => {
  try {
    const {empleado, producto} = req.body;

    const updatedProgramacion = await programacionModel.findOneAndUpdate(
      { _id: req.params.id },
      { empleado, producto},
      { new: true } // req.body trae los nuevos datos
    );
    return res.json(updatedProgramacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteProgramacion = async (req, res) => {
  try {
    const deletedProgramacion = await programacionModel.findByIdAndDelete(req.params.id);
    if (!deletedProgramacion)
      return res.status(404).json({ message: "Programacion no encontrada" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

import empleSchema from "../models/empleados.model.js";

// Obtener todos los empleados del usuario actual
export const getEmpleados = async (req, res) => {
  try {
    const empleados = await empleSchema.find();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Crear un nuevo empleado
export const createEmpleado = async (req, res) => {
  const { username, typeEmpl, identify } = req.body;

  try {

    const empleFound = await empleSchema.findOne({ identify });
    if (empleFound){
      return res.status(400).json(['Este documento ya existe.']);

    }

    const newEmpleado = new empleSchema({
      username,
      typeEmpl,
      identify,
    });

    await newEmpleado.save();
    res.json(newEmpleado);


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Eliminar un empleado por su ID
export const deleteEmpleado = async (req, res) => {
  try {
    const deletedEmpleado = await empleSchema.findByIdAndDelete(req.params.id);
    if (!deletedEmpleado)
      return res.status(404).json({ message: "Empleado no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Actualizar un empleado por su ID
export const updateEmpleado = async (req, res) => {
  try {
    const { username, typeEmpl, identify } = req.body;
    const empleadoUpdated = await empleSchema.findOneAndUpdate(
      { _id: req.params.id, },
      { username, typeEmpl, identify },
      { new: true }
    );
    return res.json(empleadoUpdated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obtener un empleado por su ID
export const getEmpleado = async (req, res) => {
  try {
    const empleado = await empleSchema.findById(req.params.id);
    if (!empleado) return res.status(404).json({ message: "Empleado no encontrado" });
    return res.json(empleado);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

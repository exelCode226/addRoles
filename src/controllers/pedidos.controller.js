import { pedidosModel } from "../models/pedidos.model.js";
import { ObjectId } from "mongodb";

export async function getPedidos(req, res, next) {
  try {
    const pedidos = await pedidosModel
      .find()
      .populate("cliente", "nombreCompleto")
      .populate("productos.producto", "nombre");

    res.json(pedidos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export const getIdPedido = async (req, res, next) => {
  try {
    const pedido = await pedidosModel.findById(req.params.id);
    if (!pedido)
      return res.status(404).json({ message: "pedido no encontrado" });
    return res.json(pedido);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export function createPedido(req, res) {
  const { cliente, productos, fecha_aprox, especificaciones } = req.body;

  const NuevoPedido = new pedidosModel({
    cliente,
    productos, // Aquí debes proporcionar un arreglo de objetos { producto, cantidad }
    fecha_aprox,
    especificaciones
  });

  NuevoPedido.save()
    .then((response) => {
      console.log(response + " Se creó correctamente");
      res.status(201).json(response); // 201 significa "Creado con éxito"
    })
    .catch((error) => {
      console.log("El error es: \n" + error);
      res.status(500).json({ message: error.message });
    });
}


export const updatePedido = async (req, res) => {
  try {
    const {cliente, productos, fecha_aprox, cantidad, especificaciones } = req.body;

    const updatedPedido = await pedidosModel.findOneAndUpdate(
      { _id: req.params.id },
      { cliente, productos, fecha_aprox, cantidad, especificaciones },
      { new: true } // req.body trae los nuevos datos
    );
    return res.json(updatedPedido);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deletePedido = async (req, res) => {
  try {
    const deletedPedido = await pedidosModel.findByIdAndDelete(req.params.id);
    if (!deletedPedido)
      return res.status(404).json({ message: "pedido no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

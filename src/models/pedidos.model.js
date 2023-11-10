import mongoose from "mongoose";
import { clientesModel } from "../models/clientes.model.js";

const pedidosSchema = new mongoose.Schema({
  cliente: [{ type: mongoose.Types.ObjectId, ref: "Cliente", required: true }],
  productos: [
    {
      producto: { type: mongoose.Types.ObjectId, ref: "productos", required: true },
      cantidad: { type: Number, required: true },
    }
  ],

  fecha_aprox: {
    type: String,
    trim: true,
    required: true,
  },
  especificaciones: {
    type: String,
    required: true,
  },
  
});

export const pedidosModel = mongoose.model("pedidos", pedidosSchema);

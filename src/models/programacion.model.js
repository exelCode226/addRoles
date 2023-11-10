import mongoose from "mongoose";

const programacionSchema = new mongoose.Schema({
    empleado: { type: mongoose.Types.ObjectId, ref: "Empleado", required: true },
    producto: { type: mongoose.Types.ObjectId, ref: "productos", required: true },
    // estado: {Boolean, required: true, default: false},

})

export const programacionModel = mongoose.model('Programacion', programacionSchema, "programaciones");


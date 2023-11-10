import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true

    },
    actividades: [{
        type: mongoose.Schema.Types.ObjectId,ref:'actividades'
    }]

})

export const ProductModel = mongoose.model('productos', productSchema);
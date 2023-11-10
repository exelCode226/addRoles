import mongoose from "mongoose";

const empleSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    typeEmpl: {
      type: String,
      required: true,
    },
    identify: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Empleado", empleSchema);

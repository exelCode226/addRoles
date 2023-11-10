import { Router } from "express";
import { authRequired, isPropietario } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createEmpleSchema } from "../schemas/emple.schema.js";
import { createEmpleado, deleteEmpleado, getEmpleados, updateEmpleado, getEmpleado } from "../controllers/empleado.controller.js";

const router = Router();

router.get("/empleados", getEmpleados);

router.post("/empleados", createEmpleado);

router.get("/empleados/:id",authRequired, getEmpleado);

router.put("/empleados/:id", authRequired, updateEmpleado);

router.delete("/empleados/:id", authRequired, deleteEmpleado);

export default router;

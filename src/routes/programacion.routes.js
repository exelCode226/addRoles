import { Router } from "express";
import express from "express";
//import { authRequired, isAdminOPropietario, isAdministrador, isGerente, isGerenteOPropietario, isPropietario } from "../middlewares/validateToken.js";
import {getProgramacion, getIdProgramacion, updateProgramacion, deleteProgramacion, createProgramacion} from '../controllers/programacion.controller.js'
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createProgramacionSchema } from "../schemas/programacion.shema.js";

const router = express.Router()
router.get('/programaciones',  getProgramacion)
router.get('/programaciones/:id' ,  getIdProgramacion)
router.post('/programaciones',validateSchema(createProgramacionSchema), createProgramacion);
router.put('/programaciones/:id', updateProgramacion);
router.delete('/programaciones/:id' , deleteProgramacion);


export default router;
import { Router } from "express";
import { authRequired, isAdminOPropietario, isAdministrador, isGerente, isGerenteOPropietario, isPropietario } from "../middlewares/validateToken.js";
import {getClientes, getIdCliente, updateClient, deleteClient, createClient} from '../controllers/clientes.controllers.js'
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createClienteSchema } from "../schemas/cliente.shema.js";

const router = Router()
router.get('/clientes', [authRequired, isGerenteOPropietario], getClientes)
router.get('/clientes/:id' , [authRequired, isGerenteOPropietario], getIdCliente)
router.post('/clientes',[authRequired, isGerenteOPropietario],validateSchema(createClienteSchema), createClient);
router.put('/clientes/:id',[authRequired, isGerenteOPropietario], updateClient);
router.delete('/clientes/:id' ,[authRequired, isGerenteOPropietario], deleteClient);


export default router;


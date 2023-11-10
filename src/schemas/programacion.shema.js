import { z } from "zod";

export const createProgramacionSchema = z.object({
    empleado: z.unknown({
        required_error:'Se requiere el empleado'
    }),
    producto: z.unknown({
        required_error:'Se requiere el producto'
    })
});
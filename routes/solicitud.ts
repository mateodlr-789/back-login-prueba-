import { Router } from 'express';
import { check } from 'express-validator';

import { getSolicitud, createSolicitud, getSolicitudes, deleteSolicitud } from '../controllers/solicitud';
import { validarJWT } from '../middlewares/validar-jwt';
import { validarCampos } from '../helpers/validar-campos';

const router = Router();

router.get('/:id', [validarJWT], getSolicitud );
router.get('/', [validarJWT], getSolicitudes );
router.post('/',
    [
        validarJWT,
        check('codigo', 'El codigo es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        check('resumen', 'El resumen es obligatorio').not().isEmpty(),
        check('id_empleado', 'El id del empleado es obligatorio').not().isEmpty(),
        validarCampos
        ],
        createSolicitud );
router.delete('/:id', [validarJWT], deleteSolicitud );

export default router;
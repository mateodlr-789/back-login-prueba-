import { Router } from 'express';

import { getUsuario, getUsuarios, createUsuario, loginUsuario } from '../controllers/usuario';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.get('/', [validarJWT],      getUsuarios );
router.get('/:id', [validarJWT],   getUsuario );
router.post('/',    createUsuario );
router.post('/login', loginUsuario);

export default router;
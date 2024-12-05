import express from 'express';
import { register, login, logout, recoverPassword } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/recover-password', recoverPassword);

export default router;
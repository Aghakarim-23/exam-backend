import express from 'express';
import {register, login, confirmEmail} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get("/confirm-email/:token", confirmEmail);

export default router;
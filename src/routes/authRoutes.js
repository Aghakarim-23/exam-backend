import express from 'express';
import {register, login, confirmEmail, requestPasswordReset, resetPassword, me, updateProfile, changePassword} from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleWare.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get("/confirm-email/:token", confirmEmail);

router.post("/request-password-reset", requestPasswordReset);

router.post("/reset-password", resetPassword)

router.get("/me", authMiddleware, me);

router.patch("/update-profile", authMiddleware, updateProfile)

router.patch("/change-password", authMiddleware, changePassword)

export default router;
import express from 'express';
import { registerUser } from '../controllers/userController.js'; // Use .js extension

const router = express.Router();

router.post('/register', registerUser);

export default router;

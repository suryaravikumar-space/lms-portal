import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js'; // Use .js extension

const router = express.Router();

router.post('/register', registerUser);
// Login User
router.post('/login', loginUser);

export default router;

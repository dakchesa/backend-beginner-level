import {Router} from 'express';

import { loginUser, registerUser } from '../controllers/user.contoller.js';

const router = Router();

// router.post('/register', registerUser);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

export default router;
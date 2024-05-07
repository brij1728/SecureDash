import { login, register } from '../controllers';

import  { Router } from 'express';

const router = Router();

// Register a new user
router.post('/register', register);

// User login
router.post('/login', login);

// User logout
router.post('/logout', (req, res) => {
  res.send('User logout');
});

export default router;



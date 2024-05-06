import  { Router } from 'express';
import { register } from '../controllers';

const router = Router();

// Register a new user
router.post('/register', register);

// User login
router.post('/login', (req, res) => {
  res.send('User login');
});

// User logout
router.post('/logout', (req, res) => {
  res.send('User logout');
});

export default router;



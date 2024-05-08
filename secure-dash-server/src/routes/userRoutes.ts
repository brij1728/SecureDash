import { deleteUser, getAllUsers, updateUser } from '../controllers';
import { isAuthenticated, isOwner } from '../middlewares';

import { Router } from 'express';

const router = Router();

// Route to get all users
router.get('/users',isAuthenticated, getAllUsers);
router.delete('/users/:id',isAuthenticated, isOwner, deleteUser); 
router.put('/users/:id',isAuthenticated, isOwner, updateUser);



// router.post('/users', createUser);    // To create a new user
// router.get('/users/:id', getUserById); // To get a user by ID
export default router;

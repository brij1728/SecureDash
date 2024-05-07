import { Router } from 'express';
import { getAllUsers } from '../controllers';

const router = Router();

// Route to get all users
router.get('/users', getAllUsers);


// router.post('/users', createUser);    // To create a new user
// router.get('/users/:id', getUserById); // To get a specific user by ID
// router.put('/users/:id', updateUser); // To update a specific user
// router.delete('/users/:id', deleteUser); // To delete a specific user

export default router;

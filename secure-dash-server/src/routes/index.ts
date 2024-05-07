import { Router } from 'express';
import authRoutes from './authRoutes';
import testRouter from './testRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use(testRouter);
router.use('/', userRoutes);


export default router;

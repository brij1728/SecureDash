import { Router } from 'express';
import authRoutes from './authRoutes';
import testRouter from './testRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use(testRouter);


export default router;

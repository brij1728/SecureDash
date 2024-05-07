import { Router } from 'express';

const testRouter = Router();

testRouter.get('/test', (req, res) => {
  res.status(200).send('Test endpoint is working!');
});

export default testRouter;

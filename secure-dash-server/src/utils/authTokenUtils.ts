import { Request, Response } from 'express';

import crypto from 'crypto';

const secret = "BRIJESH-REST-API";

export const random = (req: Request, res: Response) => {
  const length = parseInt(req.query.length as string) || 32; 
  const buffer = crypto.randomBytes(length);
  const token = buffer.toString('base64');
  res.send(token);
};

export const authentication = (salt: string, password: string) => {
  const hash = crypto.createHmac('sha512', [salt, password].join('/'));
  hash.update(secret);
  return hash.digest('hex');
};

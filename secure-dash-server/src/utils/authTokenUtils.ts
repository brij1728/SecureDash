import { Request, Response } from 'express';

import crypto from 'crypto';

const secret = "BRIJESH-REST-API";

export const generateSalt = (): string => {
  const length = 128; 
  const buffer = crypto.randomBytes(length);
  return buffer.toString('base64');
};


export const hashPassword = (salt: string, password: string) => {
  const hash = crypto.createHmac('sha512', [salt, password].join('/'));
  hash.update(secret);
  return hash.digest('hex');
};

export const generateSessionToken = (): string => {
    const buffer = crypto.randomBytes(64); 
    return buffer.toString('hex');
};

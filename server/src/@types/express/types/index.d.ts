import { JwtPayload } from '@types/jsonwebtoken/index.js';
import { Express } from 'express-serve-static-core';

// Extendemos la interface de Request para poder agregar la propiedad user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; 
    }
  }
}
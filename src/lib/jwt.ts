import * as jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

// Generate a secure random secret if JWT_SECRET is not set
const JWT_SECRET = process.env['JWT_SECRET'] || randomBytes(32).toString('hex');

interface UserPayload {
  id: string;
  email: string;
  [key: string]: any;
}

export interface JWTPayload extends UserPayload, jwt.JwtPayload {}

export async function signJWT(payload: UserPayload, expiresIn: string | number = '30d'): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn } as jwt.SignOptions,
      (err: Error | null, token: string | undefined) => {
        if (err || !token) {
          return reject(err || new Error('Failed to generate token'));
        }
        resolve(token);
      }
    );
  });
}

export async function verifyJWT(token: string): Promise<{
  payload: JWTPayload | null;
  error: string | null;
}> {
  try {
    const decoded = await new Promise<jwt.JwtPayload>((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return reject(err);
        if (!decoded || typeof decoded === 'string') {
          return reject(new Error('Invalid token'));
        }
        resolve(decoded);
      });
    });

    const payload = decoded as JWTPayload;
    
    // Ensure the payload has the required fields
    if (!payload.id || !payload.email) {
      return { payload: null, error: 'Invalid token payload' };
    }

    return { payload, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Invalid or expired token';
    return { payload: null, error: errorMessage };
  }
}

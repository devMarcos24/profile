import { SignJWT, jwtVerify } from 'jose';
import { randomBytes } from 'crypto';

// Generate a secure random secret if JWT_SECRET is not set
const JWT_SECRET = process.env['JWT_SECRET'] || randomBytes(32).toString('hex');

// Create a proper secret key
const secret = new TextEncoder().encode(JWT_SECRET);

export interface JWTPayload {
  id: string;
  email: string;
  [key: string]: any;
}

export async function signJWT(payload: JWTPayload, expiresIn = '30d'): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function verifyJWT(token: string): Promise<{
  payload: JWTPayload | null;
  error: string | null;
}> {
  try {
    const result = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });

    // Ensure the payload has the required fields
    const payload = result.payload as JWTPayload;
    if (!payload.id || !payload.email) {
      return { payload: null, error: 'Invalid token payload' };
    }

    return { payload, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Invalid or expired token';
    return { payload: null, error: errorMessage };
  }
}

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { verify, sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

// Usar uma chave padrão apenas para desenvolvimento
const JWT_SECRET = process.env['JWT_SECRET']
if (!JWT_SECRET) {
  console.warn('⚠️ JWT_SECRET não está definido nas variáveis de ambiente. Usando chave de desenvolvimento.');
}

type User = {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
};

type LoginResponse = {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
};

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return { success: false, error: 'Usuário não encontrado' };
    }

    if (!user.password) {
      return { success: false, error: 'Usuário ou senha inválidos' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, error: 'Senha incorreta' };
    }

    if (!JWT_SECRET) {
      console.warn('⚠️ JWT_SECRET não está definido nas variáveis de ambiente. Usando chave de desenvolvimento.');
      return { success: false, error: 'Erro ao fazer login' };
    }

    const token = sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email || '',
        name: user.name || '',
        role: user.role as 'ADMIN' | 'USER',
      },
      token,
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Erro ao fazer login' };
  }
}

export async function validateToken(token: string): Promise<User | null> {
  try {
    if (!JWT_SECRET) {
      console.warn('⚠️ JWT_SECRET não está definido nas variáveis de ambiente. Usando chave de desenvolvimento.');
      return null;
    }

    const decoded = verify(token, JWT_SECRET) as { id: string };

    const user = await prisma.user.findFirst({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) return null;

    return user as User;
  } catch (error) {
    console.error('Token validation error:', error);
    return null;
  }
}

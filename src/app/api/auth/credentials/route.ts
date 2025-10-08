import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { message: 'Email ou senha inválidos' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Email ou senha inválidos' },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env['NEXTAUTH_SECRET'], {
      expiresIn: '1d',
    });

    return NextResponse.json(
      { message: 'Login realizado com sucesso', user: { ...user, password: undefined }, token },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error signing in:', error);
    return NextResponse.json(
      { message: 'Erro ao fazer login' },
      { status: 500 }
    );
  }
}

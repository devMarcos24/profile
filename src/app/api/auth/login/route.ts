import { NextResponse } from 'next/server';
import { login } from '@/lib/auth-service';

// Desativa o cache para esta rota
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const result = await login(email, password);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Falha no login' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

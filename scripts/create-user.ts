import bcrypt from 'bcryptjs';
import prisma from '../src/lib/prisma';

async function createUser() {
  try {
    const email = 'dev.marcos1995@gmail.com';
    const password = 'suaSenhaSegura123';
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log('ℹ️  Usuário já existe. Atualizando a senha...');
      
      // Update existing user with new password and role
      const hashedPassword = await bcrypt.hash(password, 12);
      
      await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
        },
      });
      
      console.log('✅ Senha do usuário atualizada com sucesso!');
    } else {
      // Create new user if doesn't exist
      const hashedPassword = await bcrypt.hash(password, 12);
      
      await prisma.user.create({
        data: {
          name: 'Marcos Menezes',
          email,
          password: hashedPassword,
        },
      });
      
      console.log('✅ Usuário criado com sucesso!');
    }
    
    console.log('-----------------------');
    console.log('Email:', email);
    console.log('Senha:', password);
    console.log('-----------------------');
  } catch (error) {
    console.error('❌ Erro ao criar/atualizar usuário:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUser();

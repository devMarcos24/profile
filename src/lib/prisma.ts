import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create a new Prisma client instance
const prismaClient = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error'],
});

// In development, assign the Prisma client to the global object
// to maintain a single instance across hot reloads
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prismaClient;
}

// Helper function to check database connection
export async function checkDatabaseConnection() {
  try {
    // Only run the query check on the server side
    if (typeof window === 'undefined') {
      await prismaClient.$queryRaw`SELECT 1`;
    }
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

// Export the Prisma client instance
export const prisma = prismaClient;

export default prisma;

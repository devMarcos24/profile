import { PrismaClient } from '@prisma/client';

declare global {
  // Add prisma to the NodeJS global type
  // This prevents TypeScript errors when accessing global.prisma
  var prisma: PrismaClient | undefined;
}

// This export is needed for the file to be treated as a module
export {};

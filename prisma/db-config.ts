// Database configuration
export default {
  databaseUrl: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/mydb',
  directUrl: process.env.DIRECT_URL || 'postgresql://user:password@localhost:5432/mydb',
};

import { PrismaClient } from '@prisma/client';

// Singleton class to manage Prisma Client instance
class Prisma {
  private static instance: PrismaClient;

  private constructor() {}

  // Method to get the single instance of PrismaClient
  static getInstance(): PrismaClient {
    if (!Prisma.instance) {
      Prisma.instance = new PrismaClient();
    }
    return Prisma.instance;
  }
}

export default Prisma.getInstance();
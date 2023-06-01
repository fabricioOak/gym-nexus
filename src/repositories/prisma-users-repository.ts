import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) { // UserCreateInput was made by Prisma by default when we created the User model
    await prisma.user.create({
      data
    });
  }
}

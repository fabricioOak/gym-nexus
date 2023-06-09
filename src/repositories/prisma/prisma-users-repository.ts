import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { UsersRepository } from '../users-repository';

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async create(data: Prisma.UserCreateInput) { // UserCreateInput was made by Prisma by default when we created the User model
    const user = await prisma.user.create({
      data
    });
    return user;
  }
}

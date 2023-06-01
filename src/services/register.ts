import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository';


interface RegisterServiceParams {
  name: string;
  email: string;
  password: string;
}

export const registerService = async ({
  name,
  email,
  password,
}: RegisterServiceParams) => {
  const password_hash = await hash(password, 4);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error('User with same email already exists');
  }

  const prismaUsersRepository = new PrismaUsersRepository();

  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
  });

};

import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

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

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash
    }
  });
};

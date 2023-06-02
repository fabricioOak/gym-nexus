import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { RegisterService } from '@/services/register';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(prismaUsersRepository);

    await registerService.execute({
      name,
      email,
      password,
    });
  } catch (err: unknown) {
    return reply.status(400).send({
      message: err instanceof Error && err.message,
    });
  }


  return reply.status(201).send();
};

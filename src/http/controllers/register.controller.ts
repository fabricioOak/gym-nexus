import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { registerService } from '@/services/register';

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    await registerService({
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

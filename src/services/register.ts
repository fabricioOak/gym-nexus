import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';


interface RegisterServiceParams {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {

  constructor(private usersRepository: UsersRepository) { }

  async execute({
    name,
    email,
    password,
  }: RegisterServiceParams) {
    const password_hash = await hash(password, 4);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error('User with same email already exists');
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

  }
}



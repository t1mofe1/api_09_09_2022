import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserPremiumType } from 'src/users/entities/user.entity';
import { ObjectID, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async;

  async findById(id: ObjectID) {
    return this.usersRepository.findOneBy({ id });
  }

  async findByUsername(username: string) {
    return this.usersRepository.findOneBy({
      username,
    });
  }

  async setPremium(
    username: string,
    type: UserPremiumType = UserPremiumType.PREMIUM,
  ) {
    return this.usersRepository.update(
      {
        username,
      },
      {
        premium: type,
      },
    );
  }

  async deleteById(id: ObjectID) {
    return this.usersRepository.delete({
      id,
    });
  }
}

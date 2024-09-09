import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async resetProblemsFlags(): Promise<number> {
    const count = await this.userModel.count({ where: { has_problem: true } });

    await this.userModel.update(
      { has_problem: false },
      { where: { has_problem: true } },
    );

    return count;
  }
}

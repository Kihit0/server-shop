import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/reset-problems-flag')
  async resetProblemFlag() {
    const count = await this.userService.resetProblemsFlags();

    return { count };
  }
}

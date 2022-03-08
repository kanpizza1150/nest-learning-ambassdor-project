import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor) //to ignore @Exclude column in entity
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.find();
  }

  @UseGuards(AuthGuard)
  @Get('admin/ambassadors')
  ambassadors(): Promise<User[]> {
    return this.userService.find({ is_ambassador: true });
  }
}

import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Put,
  Res,
  UseGuards,
  Headers,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthGuard } from '../guard/auth.guard';
import { JWTDecodeInterceptor } from '../interceptors/jwt.interceptor';
@Controller()
@UseInterceptors(ClassSerializerInterceptor) //to ignore @Exclude column in entity
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  @Post('admin/register')
  async register(@Body() body: RegisterDto) {
    const { password_confirm, ...data } = body;
    if (data.password !== password_confirm) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashed = await bcrypt.hash(body.password, 12);
    return this.userService.save({
      ...data,
      password: hashed,
      is_ambassador: false,
    });
  }
  @Post('admin/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({
      id: user.id,
    });

    response.cookie('jwt', jwt, { httpOnly: true });
    return { message: 'success' };
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(JWTDecodeInterceptor)
  @Get('admin/user')
  async user(@Headers('user_id') userId: number) {
    const user = await this.userService.findOne({ id: userId });
    return user;
  }

  @UseGuards(AuthGuard)
  @Post('admin/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'success' };
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(JWTDecodeInterceptor)
  @Put('admin/users/info')
  async updateInfo(
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string,
    @Headers('user_id') userId: number,
  ) {
    await this.userService.update(userId, { first_name, last_name, email });
    return this.userService.findOne({ id: userId });
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(JWTDecodeInterceptor)
  @Put('admin/users/password')
  async updatePassword(
    @Headers('user_id') userId: number,
    @Body('password_confirm') password_confirm: string,
    @Body('password') password: string,
  ) {
    if (password !== password_confirm) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashed = await bcrypt.hash(password, 12);
    await this.userService.update(userId, { password: hashed });
    return { message: 'success' };
  }
}

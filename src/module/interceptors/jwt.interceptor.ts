import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTDecodeInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}
  public async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const cookie = request.cookies['jwt'];
    const { id } = await this.jwtService.verifyAsync(cookie);

    request.headers.user_id = id;

    return next.handle();
  }
}

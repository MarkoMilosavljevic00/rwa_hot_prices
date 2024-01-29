import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class OwnershipGuard implements CanActivate  {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const params = request.params;

    if (user && params.id && user.id === Number(params.id)) {
      return true;
    } else {
      throw new UnauthorizedException('You do not own this resource');
    }
  }
}

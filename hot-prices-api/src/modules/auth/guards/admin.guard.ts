import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Role } from 'src/common/enums/role.enum';
import { Post } from 'src/models/entities/post.entity';
import { PostService } from 'src/modules/post/post.service';
import { Repository } from 'typeorm';

@Injectable()
export class AdminGuard implements CanActivate  {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.role === Role.ADMIN) {
      return true;
    } else {
      throw new UnauthorizedException('You do not have permission to access this resource');
    }
  }
}

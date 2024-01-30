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
import { Post } from 'src/models/entities/post.entity';
import { PostService } from 'src/modules/post/post.service';
import { Repository } from 'typeorm';

@Injectable()
export class OwnershipGuard implements CanActivate  {
  constructor(@InjectRepository(Post) private repository: Repository<Post>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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

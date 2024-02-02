import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, of } from 'rxjs';
import { ResourceType } from 'src/common/enums/resource-type.enum';
import { Comment } from 'src/models/entities/comment.entity';
import { Post } from 'src/models/entities/post.entity';
import { Repository } from 'typeorm';

export const OwnershipGuard = (resourceType: ResourceType) => {
  class OwnershipMixin implements CanActivate {
    constructor(
      @InjectRepository(Post) public postRepository: Repository<Post>,
      @InjectRepository(Comment) public commentRepository: Repository<Comment>,
    ) {}

    async canActivate(
      context: ExecutionContext,
    ): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const params = request.params;
      let resource: Post | Comment;

      if (resourceType === 'post') {
        resource = await this.postRepository.findOne({
          where: { id: params.id },
          relations: ['owner'],
        });
      } else if (resourceType === 'comment') {
        resource = await this.commentRepository.findOne({
          where: { id: params.id },
          relations: ['owner'],
        });
      }

      if (resource && resource.owner.id === user.id) {
        return true;
      } else {
        throw new UnauthorizedException('You do not own this resource');
      }
    }
  }

  const guard = mixin(OwnershipMixin);
  return guard;
};

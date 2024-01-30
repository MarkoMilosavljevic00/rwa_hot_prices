import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/user.entity';
import { UserService } from '../user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { Post } from 'src/models/entities/post.entity';
import { PostService } from '../post/post.service';
import { FileService } from '../file/file.service';

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt',  }),
    PassportModule,
    JwtModule.register({
      secret: '17782',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([User, Post])
  ],
  providers: [AuthService, UserService, JwtStrategy, LocalStrategy, PostService, FileService],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, PassportModule, LocalStrategy],
})
export class AuthModule {}

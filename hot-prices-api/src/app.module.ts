import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OfferModule } from './modules/offer/offer.module';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    OfferModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

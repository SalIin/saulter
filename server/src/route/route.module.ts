import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RouteController } from './route.controller';

import { RouteService } from './route.service';

import { RouteEntity } from './route.entity';
import { UserEntity } from '@/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RouteEntity, UserEntity])],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RouteModule {}

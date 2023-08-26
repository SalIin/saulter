import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthGuard } from '@/user/guards/auth.guard';

import { RouteService } from './route.service';

import { CreateRouteDto } from './dto/createRouteDto';

import { User } from '@/user/decorators/user.decorator';

import { RouteEntity } from './route.entity';
import { UserEntity } from '@/user/user.entity';

import { RoutesResponseInterface } from '@/types/route';

@Controller('routes')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get()
  async findAll(): Promise<RoutesResponseInterface[]> {
    const routes = await this.routeService.findAll();

    return routes.map(this.routeService.buildRouteResponse);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @User() currentUser: UserEntity,
    @Body('route') createRouteDto: CreateRouteDto,
  ): Promise<RoutesResponseInterface> {
    const route = await this.routeService.create(createRouteDto, currentUser);

    return this.routeService.buildRouteResponse(route);
  }

  @Post(':id/favorite')
  @UseGuards(AuthGuard)
  async addRouteToFavorite(
    @User('id') currentUserId: string,
    @Param('id') id: string,
  ): Promise<RoutesResponseInterface> {
    const route = await this.routeService.toggleFavorite(id, currentUserId);

    return this.routeService.buildRouteResponse(route);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(
    @User('id') currentUserId: string,
    @Param('id') id: string,
  ): Promise<RoutesResponseInterface> {
    const route = await this.routeService.delete(id, currentUserId);

    return this.routeService.buildRouteResponse(route);
  }
}

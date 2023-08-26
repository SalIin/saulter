import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RouteEntity } from './route.entity';

import { CreateRouteDto } from './dto/createRouteDto';
import { UserEntity } from '@/user/user.entity';
import { RoutesResponseInterface } from '@/types/route';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(RouteEntity)
    private readonly routeRepository: Repository<RouteEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    createRouteDto: CreateRouteDto,
    currentUser: UserEntity,
  ): Promise<RouteEntity> {
    const newRoute = new RouteEntity();

    Object.assign(newRoute, createRouteDto);

    newRoute.user = currentUser;
    newRoute.favorites = [];

    return await this.routeRepository.save(newRoute);
  }

  async findAll() {
    return await this.routeRepository.find({
      select: {
        id: true,
        title: true,
        description: true,
        shortDescription: true,
        length: true,
        markers: true,
        favorites: {
          id: true,
        },
        user: {
          id: true,
        },
      },
      relations: {
        favorites: true,
        user: true,
      },
    });
  }

  async toggleFavorite(id: string, currentUserId: string) {
    const route = await this.routeRepository.findOne({
      where: { id },
      relations: ['favorites', 'user'],
    });

    if (!route) {
      throw new HttpException('Route does not exist', HttpStatus.NOT_FOUND);
    }

    const user = await this.userRepository.findOne({
      where: { id: currentUserId },
    });

    const favoriteRouteIdx = route.favorites.findIndex(
      ({ id }) => id === currentUserId,
    );

    if (favoriteRouteIdx === -1) {
      route.favorites.push(user);

      await this.userRepository.save(user);
      await this.routeRepository.save(route);
    } else {
      route.favorites.splice(favoriteRouteIdx, 1);

      await this.userRepository.save(user);
      await this.routeRepository.save(route);
    }

    return route;
  }

  async delete(id: string, currentUserId: string) {
    const route = await this.routeRepository.findOne({
      where: { id },
      relations: { favorites: true, user: true },
    });

    if (!route) {
      throw new HttpException('Route does not exist', HttpStatus.NOT_FOUND);
    }

    if (route.user.id !== currentUserId) {
      throw new HttpException(
        'You are not an author of this route',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.routeRepository.remove(route);

    return route;
  }

  buildRouteResponse(route: RouteEntity): RoutesResponseInterface {
    const { user, ...restRoute } = route;

    return {
      ...restRoute,
      favorites: restRoute.favorites.map(({ id }) => id),
      author: user.id,
    };
  }
}

import { RouteEntity } from '@/route/route.entity';

export interface RoutesResponseInterface
  extends Omit<RouteEntity, 'favorites' | 'user'> {
  favorites: string[];
  author: string;
}

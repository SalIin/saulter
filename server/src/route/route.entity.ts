import { UserEntity } from '@/user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class Marker {
  lat: number;
  lng: number;
}

@Entity({ name: 'routes' })
export class RouteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  shortDescription: string;

  @Column()
  description: string;

  @Column()
  length: string;

  @Column('jsonb')
  markers: Marker[];

  @ManyToOne(() => UserEntity, (user) => user.routes)
  user: UserEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  favorites: UserEntity[];
}

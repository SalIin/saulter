import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserEntity } from './user.entity';

import { CreateUserDto, LoginDto } from './dto/user.dto';

import { UserResponseInterface } from '@/types/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private configService: ConfigService,
  ) {}

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const userByIdentifier = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (userByIdentifier) {
      throw new HttpException(
        'Email or username already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();

    Object.assign(newUser, user);

    return await this.userRepository.save(newUser);
  }

  async login(credentials: LoginDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email: credentials.email,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const isPasswordValid = await this.validatePassword(
      credentials.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  private async validatePassword(bodyPassword: string, dbPassword: string) {
    return await compare(bodyPassword, dbPassword);
  }

  private generateJwt(user: UserEntity): string {
    const secret = this.configService.get<string>('JWT_SECRET');

    return sign({ id: user.id, email: user.email }, secret, {
      expiresIn: '7d',
    });
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    delete user.password;

    return {
      ...user,
      accessToken: this.generateJwt(user),
    };
  }
}

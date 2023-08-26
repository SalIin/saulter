import { ConfigService } from '@nestjs/config';
import { NextFunction, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Injectable, NestMiddleware } from '@nestjs/common';

import { UserService } from '../user.service';

import { ExpressRequestInterface } from '@/types/express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;

      return next();
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const secret = this.configService.get<string>('JWT_SECRET');

      const decode = verify(token, secret) as JwtPayload;

      const user = await this.userService.findById(decode.id);

      req.user = user;

      next();
    } catch (e) {
      req.user = null;
      next();
    }
  }
}

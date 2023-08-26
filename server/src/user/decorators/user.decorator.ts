import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { ExpressRequestInterface } from '@/types/express';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<ExpressRequestInterface>();
  const user = request.user;

  if (!user) {
    return null;
  }

  if (data) {
    return user[data];
  }

  return user;
});

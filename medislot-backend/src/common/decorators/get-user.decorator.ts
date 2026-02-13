import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../shared/interfaces/user.interface';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!data) return user;
    return user ? user[data] : undefined;
  },
);

export const GetUser = GetCurrentUser;

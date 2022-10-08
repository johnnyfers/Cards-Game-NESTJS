import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from 'src/domain/abstraction/auth/AuthRequest.interface';
import { Player } from 'src/domain/entity/player.entity';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): Player => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);

// NestJS
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';

import { IS_PUBLIC_KEY } from '../decorators/isPublic.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly exceptions: ExceptionsService,
    private reflector: Reflector,
  ) {
    super();
  }

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const isMetrics = context
      .switchToHttp()
      .getRequest()
      .originalUrl.includes('metrics');
    if (isMetrics) return true;
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const canActivate = super.canActivate(context);

    if (typeof canActivate === 'boolean') return canActivate;

    const canActivatePromise = canActivate as Promise<boolean>;

    return canActivatePromise.catch((error) => {
      throw this.exceptions.badRequestException({
        message: error?.message,
        code_error: 401,
      });
    });
  }
}

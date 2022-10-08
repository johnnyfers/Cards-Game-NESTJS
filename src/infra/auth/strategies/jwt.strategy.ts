import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from 'src/domain/abstraction/auth/UserFromJwt.interface';
import { UserPayload } from 'src/domain/abstraction/auth/UserPayload.interface';
import { PrismaService } from 'src/infra/gateways/prisma/prisma-service/prisma-service.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload): Promise<UserFromJwt | boolean> {
    const user = await this.prisma.player.findUnique({
      where: { username: payload.username },
    });
    if (!user) return false;

    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenGenerator } from 'src/domain/abstraction/auth/tokenGenerator.interface';
import { UserPayload } from 'src/domain/abstraction/auth/UserPayload.interface';

@Injectable()
export class JWTAuth implements TokenGenerator {
  constructor(private readonly jwtService: JwtService) {}
  getToken(subject: UserPayload): string {
    return this.jwtService.sign(subject);
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenGenerator } from './tokenGenerator.interface';
import { UserPayload } from './UserPayload.interface';

@Injectable()
export class JWTAuth implements TokenGenerator {
  constructor(private readonly jwtService: JwtService) {}

  getToken(payload: UserPayload): string {
    return this.jwtService.sign(payload);
  }

  getRefreshToken(email: string, subject: string): string {
    return this.jwtService.sign({ sub: subject, email });
  }
}

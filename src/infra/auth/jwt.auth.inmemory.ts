import { randomBytes } from 'crypto';
import { TokenGenerator } from "src/domain/abstraction/auth/tokenGenerator.interface";
import { UserPayload } from "src/domain/abstraction/auth/UserPayload.interface";

export class JWTAuthInMemory implements TokenGenerator {
  getToken(_payload: UserPayload): string {
    return randomBytes(10).toString('hex');
  }
}

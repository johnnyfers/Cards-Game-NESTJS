import { UserPayload } from './UserPayload.interface';

export interface TokenGenerator {
  getToken(subject: UserPayload): string;
  getRefreshToken(email: string, subject: string): string;
}

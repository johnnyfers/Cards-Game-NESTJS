import { UserPayload } from './UserPayload.interface';

export interface TokenGenerator {
  getToken(subject: UserPayload): string;
}

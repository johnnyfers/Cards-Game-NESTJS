import { IException, IFormatExceptionMessage } from "src/domain/abstraction/expections/exceptions.interface";

export class ExceptionsInMemory implements IException {
  badRequestException(data: IFormatExceptionMessage): void {
    throw new Error(data.message);
  }
  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new Error(data.message);
  }
  forbiddenException(data?: IFormatExceptionMessage): void {
    throw new Error(data.message);
  }
  UnauthorizedException(data?: IFormatExceptionMessage): void {
    throw new Error(data.message);
  }
}

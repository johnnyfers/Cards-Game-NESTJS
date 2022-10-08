import { ILogger } from "src/domain/abstraction/logger/logger.interface";

export class LoggerInMemory implements ILogger {
  logger = [];
  
  debug(context: string, message: string): void {
    this.logger.push({ context, message });
  }
  log(context: string, message: string): void {
    this.logger.push({ context, message });
  }
  error(context: string, message: string, _trace?: string): void {
    this.logger.push({ context, message });
  }
  warn(context: string, message: string): void {
    this.logger.push({ context, message });
  }
  verbose(context: string, message: string): void {
    this.logger.push({ context, message });
  }
}

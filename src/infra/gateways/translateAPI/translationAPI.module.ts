import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { TranslationAPIGoogleCloud } from './translationAPI.googlecloud';

@Module({
  imports: [LoggerModule],
  providers: [TranslationAPIGoogleCloud],
  exports: [TranslationAPIGoogleCloud],
})
export class TranslationAPIModule {}

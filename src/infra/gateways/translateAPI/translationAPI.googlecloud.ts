import { TranslationAPI } from 'src/domain/abstraction/translateAPI/translationAPI.interface';
import { Translate } from '@google-cloud/translate/build/src/v2';
import { LoggerService } from '../logger/logger.service';
import { Inject } from '@nestjs/common';

export class TranslationAPIGoogleCloud implements TranslationAPI {
  private CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
  private client: Translate;

  constructor(@Inject(LoggerService) private readonly logger: LoggerService) {
    this.client = new Translate({
      credentials: this.CREDENTIALS,
      projectId: this.CREDENTIALS.project_id,
    });
  }

  async translate(text: string, translateTo: string): Promise<string> {
    try {
      let [response] = await this.client.translate(text, translateTo);
      return response;
    } catch (error) {
      this.logger.error('Error at translateText', error.message);
      return text;
    }
  }
}

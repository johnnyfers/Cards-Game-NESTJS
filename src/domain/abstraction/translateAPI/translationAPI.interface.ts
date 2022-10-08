export interface TranslationAPI {
  translate(text: string, translateTo: string): Promise<string>;
}

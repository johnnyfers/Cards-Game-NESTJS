import { TranslationAPI } from "src/domain/abstraction/translateAPI/translationAPI.interface";

export class TranslationAPIInMemory implements TranslationAPI {
    async translate(text: string, translateTo: string): Promise<string> {
        console.log(text + 'translated to ' + translateTo);
        return text
    }
 
}

import { getBrowserLang, Translation, translocoConfig, TranslocoConfig, TranslocoLoader } from '@ngneat/transloco';
import { Observable, of } from 'rxjs';
import { TTypedTranslocoConfig } from '../types';

export abstract class AbstractTranslocoConfigService<
    i18nDb extends Record<string, Translation>,
    Lang extends keyof i18nDb = keyof i18nDb,
> implements TranslocoLoader {
    public readonly AVAILABLE_LANGS: Lang[]

    protected constructor(
        public readonly DB: i18nDb,
        public readonly DEFAULT_LANG: Lang,
    ) {
        this.AVAILABLE_LANGS = Array.from(
            new Set<Lang>([
                DEFAULT_LANG,
                ...Object.keys(DB) as Lang[],
            ]),
        );
    }

    public getProvidedConfig(config: TTypedTranslocoConfig): TranslocoConfig {
        const patchedConfig: Partial<TranslocoConfig> = {
            ...config,
            defaultLang: this.initializeDefaultLanguage() as string,
            availableLangs: this.AVAILABLE_LANGS as string[],
            fallbackLang: this.DEFAULT_LANG as string
        }

        return translocoConfig(patchedConfig);
    }

    private initializeDefaultLanguage(): Lang {
        const browserLanguage = getBrowserLang() as Lang | undefined;

        if (!browserLanguage) {
            return this.DEFAULT_LANG
        }

        return this.isAvailableLang(browserLanguage) ? browserLanguage : this.DEFAULT_LANG;
    }


    public isAvailableLang(lang: Lang | string): lang is Lang {
        return this.AVAILABLE_LANGS.includes(lang as Lang)
    }

    public getTranslation(lang: string): Observable<Translation> {
        return of(this.DB[lang])
    }
}

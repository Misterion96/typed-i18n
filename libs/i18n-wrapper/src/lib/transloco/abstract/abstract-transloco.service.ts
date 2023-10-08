import { getBrowserLang, HashMap, Translation, TranslocoService } from '@ngneat/transloco';
import { Observable, } from 'rxjs';
import { TTranslatePath } from '../../types';
import { AbstractTranslocoConfigService } from './abstract-transloco-config.service';

export abstract class AbstractTranslocoService<
    i18nDb extends Record<string, Translation>,
    Lang extends keyof i18nDb = keyof i18nDb,
> {

    protected constructor(
        protected readonly translocoService: TranslocoService,
        protected readonly translocoConfigService: AbstractTranslocoConfigService<i18nDb, Lang>
    ) {
    }

    public getActiveLang(): Lang {
        return this.translocoService.getActiveLang() as Lang;
    }

    public setActiveLang(candidate: Lang): void {
        this.translocoService.setActiveLang(this.checkLanguage(candidate) as string);
    }

    public getDefaultLang(): Lang {
        return this.translocoService.getDefaultLang() as Lang;
    }

    public setDefaultLang(candidate: Lang): void {
        this.translocoService.setDefaultLang(this.checkLanguage(candidate) as string);
    }

    public getAvailableLangs(): Lang[] {
        return this.translocoService.getAvailableLangs() as Lang[];
    }

    private checkLanguage(language: Lang): Lang {

        if (this.translocoConfigService.isAvailableLang(language)) {
            return language as Lang
        }

        const browserLanguage: string | undefined = getBrowserLang();
        if (browserLanguage && this.translocoConfigService.isAvailableLang(browserLanguage)) {
            return browserLanguage;
        }

        return this.getActiveLang() || this.translocoConfigService.DEFAULT_LANG;
    }

    public selectTranslate$(
        path: TTranslatePath<i18nDb>,
        params?: HashMap,
        lang?: keyof i18nDb,
    ): Observable<string> {
        return this.translocoService.selectTranslate<string>(
            // @ts-ignore
            path as string,
            params,
            lang as string,
            false
        )
    }
}


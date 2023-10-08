import { HashMap, Translation } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { TTranslatePath } from '../../types';

export interface ISelectTranslateService<
    i18nDB extends Record<string, Translation>,
    Lang extends keyof i18nDB = keyof i18nDB> {
    selectTranslate$: (
        path: TTranslatePath<i18nDB>,
        params?: HashMap,
        lang?: Lang
    ) => Observable<string>
}

import { Injectable } from '@angular/core';
import { AbstractTranslocoConfigService } from 'i18n-wrapper';
import { TRANSLATE_DB } from '../db/i18n.db';

@Injectable()
export class TypedTranslocoConfigService extends AbstractTranslocoConfigService<typeof TRANSLATE_DB> {
    constructor() {
        super(TRANSLATE_DB, 'en');
    }
}

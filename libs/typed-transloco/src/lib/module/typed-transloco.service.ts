import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { AbstractTranslocoService } from 'i18n-wrapper';
import { TRANSLATE_DB } from '../db/i18n.db';
import { TypedTranslocoConfigService } from './typed-transloco-config.service';


@Injectable()
export class TypedTranslocoService extends AbstractTranslocoService<typeof TRANSLATE_DB>{
    constructor(
        translocoService: TranslocoService,
        typedTranslocoConfigService: TypedTranslocoConfigService
    ) {
        super(translocoService, typedTranslocoConfigService);
    }
}

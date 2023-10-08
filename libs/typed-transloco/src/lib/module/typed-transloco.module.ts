import { ModuleWithProviders, NgModule } from '@angular/core';
import {
    TRANSLOCO_CONFIG,
    TRANSLOCO_LOADER,
    TranslocoModule,
    TranslocoService
} from '@ngneat/transloco';
import { TTypedTranslocoConfig } from 'i18n-wrapper';
import { TypedTranslocoConfigService } from './typed-transloco-config.service';
import { TypedTranslocoService } from './typed-transloco.service';

@NgModule({
    imports: [TranslocoModule],
    providers: [TranslocoService]
})
export class TypedTranslocoModule {
    static forRoot(config: TTypedTranslocoConfig = {}): ModuleWithProviders<TypedTranslocoModule> {
        return {
            ngModule: TypedTranslocoModule,
            providers: [
                TypedTranslocoService,
                TypedTranslocoConfigService,
                {
                    provide: TRANSLOCO_LOADER,
                    useExisting: TypedTranslocoConfigService,
                },
                {
                    provide: TRANSLOCO_CONFIG,
                    deps: [TypedTranslocoConfigService],
                    useFactory: (configService: TypedTranslocoConfigService) => {
                        return configService.getProvidedConfig(config)
                    }
                }
            ]
        }
    }
}

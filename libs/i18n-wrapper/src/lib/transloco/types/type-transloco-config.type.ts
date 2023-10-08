import { TranslocoConfig } from '@ngneat/transloco';

export type TTypedTranslocoConfig = Partial<Omit<TranslocoConfig, 'defaultLang' | 'availableLangs' | 'fallbackLang'>>;

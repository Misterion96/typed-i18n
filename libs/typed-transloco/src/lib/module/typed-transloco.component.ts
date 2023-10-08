import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractTranslocoComponent } from 'i18n-wrapper';
import { TRANSLATE_DB } from '../db/i18n.db';
import { TypedTranslocoService } from './typed-transloco.service';

@Component({
  selector: 'typed-transloco-component',
  standalone: true,
  imports: [CommonModule],
  template: '{{translation}}',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypedTranslocoComponent extends AbstractTranslocoComponent<typeof TRANSLATE_DB>{
  constructor(
      public typedTranslocoService: TypedTranslocoService
  ) {
    super(typedTranslocoService);
  }
}

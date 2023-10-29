import { Directive, Input, OnChanges } from '@angular/core';
import { HashMap, Translation } from '@ngneat/transloco';
import { ISelectTranslateService } from '../interfaces';
import { Observable, ReplaySubject, switchMap } from 'rxjs';
import { TTranslatePath } from '../../types';

@Directive()
export abstract class AbstractTranslocoComponent<
  i18nDb extends Record<string, Translation>, Lang extends keyof i18nDb = keyof i18nDb,
> implements OnChanges {
  private readonly update$: ReplaySubject<void> = new ReplaySubject<void>(1);

  public translation$: Observable<string> = this.update$.asObservable().pipe(
      switchMap(() => this.getCurrentTranslation$())
  );

  @Input()
  public key!: TTranslatePath<i18nDb>

  @Input()
  public params?: HashMap;

  @Input()
  public lang?: Lang;

  protected constructor(
    protected service: ISelectTranslateService<i18nDb, Lang>
  ) {
  }

  public ngOnChanges(): void {
    this.update();
  }

  public update(): void {
    this.update$.next();
  }

  private getCurrentTranslation$(): Observable<string> {
    return this.service.selectTranslate$(
        // @ts-expect-error: not be infinite
        this.key,
        this.params,
        this.lang
    )
  }
}

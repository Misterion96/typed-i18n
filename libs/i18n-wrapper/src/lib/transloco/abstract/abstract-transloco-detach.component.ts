import { ChangeDetectorRef, Directive, HostBinding, inject, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { HashMap, Translation } from '@ngneat/transloco';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { TTranslatePath } from '../../types';
import { ISelectTranslateService } from '../interfaces';

@Directive()
export abstract class AbstractTranslocoDetachComponent<
  i18nDb extends Record<string, Translation>, Lang extends keyof i18nDb = keyof i18nDb,
> implements OnChanges, OnInit, OnDestroy {
  private readonly destroySubject$: Subject<void> = new Subject<void>();
  private readonly updateSubject$: Subject<void> = new Subject<void>();
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  public translation: string = '';

  @Input()
  @HostBinding('attr.data-i18n')
  public key!: TTranslatePath<i18nDb>

  @Input()
  public params?: HashMap;

  @Input()
  public lang?: Lang;

  protected constructor(
    protected service: ISelectTranslateService<i18nDb, Lang>
  ) {
    this.cdr.detach();
  }

  public ngOnChanges(): void {
    this.update();
  }

  public ngOnInit(): void {
    this.initTranslateListener();
    this.update();
  }

  public ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  private initTranslateListener(): void {
    this.updateSubject$
      .asObservable()
      .pipe(
          // @ts-ignore
          switchMap(() => this.service.selectTranslate$(this.key, this.params, this.lang)),
        takeUntil(this.destroySubject$),
      )
      .subscribe(translation => {
        this.translation = translation;
        this.cdr.detectChanges();
      });
  }

  public update(): void {
    this.updateSubject$.next();
  }
}

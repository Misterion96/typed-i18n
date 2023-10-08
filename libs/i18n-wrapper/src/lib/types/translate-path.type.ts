import { TObjectKeyPaths } from './object-path.type';

export type TTranslatePath<
  DB extends object,
  Langs extends keyof DB = keyof DB
> = TObjectKeyPaths<DB[Langs]>

type TAddPrefix<Prefix extends string, Key extends string> = [Prefix] extends [never]
  ? `${Key}`
  : `${Prefix}.${Key}`;

export type TObjectKeyPaths<T extends Record<string, any>, Prefix extends string = never> = {
  [P in string & keyof T]: T[P] extends object
    ? TObjectKeyPaths<T[P], TAddPrefix<Prefix, P>>
    : T[P] extends string
      ? TAddPrefix<Prefix, P>
      : never;
}[string & keyof T];

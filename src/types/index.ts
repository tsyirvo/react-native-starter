export type Primitives =
  | number
  | string
  | boolean
  | bigint
  | symbol
  | null
  | undefined;

export type UnionFromArray<T extends readonly string[]> = {
  [K in T[number]]: K;
}[T[number]];

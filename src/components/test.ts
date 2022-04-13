export type TwoDimentionalArr<T> = T extends ReadonlyArray<infer Q>
  ? Q extends ReadonlyArray<infer I>
    ? ReadonlyArray<ReadonlyArray<I> & { length: Q['length'] }>
    : never
  : never;

type TwoDimentionalNumberArr = TwoDimentionalArr<[number, number][]>;

// Error
// @ts-ignore
const b: TwoDimentionalNumberArr = [[1, 2] as const, [3] as const];
// No error
const c: TwoDimentionalNumberArr = [[1, 2] as const, [3, 4] as const];

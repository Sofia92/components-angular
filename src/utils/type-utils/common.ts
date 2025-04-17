export type AnyParam = readonly unknown[];
export type AnyFunc = (...args: AnyParam) => unknown;
export type Action<P extends AnyParam> = (...args: P) => void;
export type PureAction = Action<[]>;
export type CleanUp = PureAction;
export type PrimitiveTypes = string | number | boolean | null | undefined | bigint | symbol;
export type PlainObject = Record<string, PrimitiveTypes>;
export type EnumUnderlayingType = string | number;
export type PromiseOr<T> = T | PromiseLike<T>;
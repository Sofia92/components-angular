import { StringKey } from "../type-utils";

/**
 * 选择映射
 * @param item 输入
 * @param selector 结果选择器，传映射函数则用函数映射，传字符串键则获取输入的该属性
 * @returns 映射结果
 */
export function selectBy<T, P = unknown>(item: T, selector: Selector<T, P>): P {
    // @ts-expect-error dynamic impl
    return typeof selector === 'function' ? selector(item) : Reflect.get(item, selector);
}
export type FunctionSelector<T, P> = (item: T) => P;
export type Selector<T, P> = KeySelector<T, P> | FunctionSelector<T, P>;
export type KeySelector<T, P> = {
    [K in StringKey<T>]: T[K] extends P ? K : never;
}[StringKey<T>];
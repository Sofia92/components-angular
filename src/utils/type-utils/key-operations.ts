import { AnyFunc } from './common';

/**
 * 获取key联合的子联合
 */
export type ExtractKey<Keys extends string, K extends Keys> = K;

/**
 * 排除一些key，且具有类型约束
 */
export type ExcludeKey<Keys, K extends Keys> = Exclude<Keys, K>;

/**
 * 键约束强化版Omit
 */
export type OmitKey<T, K extends StringKey<T>> = Omit<T, K>;

/**
 * 仅字符串键类型
 */
export type StringKey<T> = Extract<keyof T, string>;

/** 属性的键，目前无法区分方法与回调 */
export type PropertyKeys<T> = {
  [K in StringKey<T>]: T[K] extends AnyFunc ? never : K;
}[StringKey<T>];

export type PropertyPart<T> = Pick<T, PropertyKeys<T>>;

/** 替换部分属性生成新类型 */
export type Replace<T, K extends keyof T, P> = {
  [Key in keyof T]: Key extends K ? P : T[Key];
};

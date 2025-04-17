import { selectBy, Selector } from './object';

function getCheckedCount<T>(list: T[], checkedSelector: Selector<T, boolean>): number {
  return list.reduce((acc, cur) => (selectBy(cur, checkedSelector) ? acc + 1 : acc), 0);
}

function _isAllChecked(checkedCount: number, totalCount: number): boolean {
  // 若勾选数量或总数有0，不认为是全选
  return !!(checkedCount && totalCount) && totalCount === checkedCount;
}
/**
 * 通用列表全勾选计算逻辑
 * @param list 列表
 * @param checkedSelector 列表项勾选状态选择器
 * @returns 列表状态是否为全勾选
 */
export function isAllChecked<T>(list: T[], checkedSelector: Selector<T, boolean>): boolean {
  const checkedCount = getCheckedCount(list, checkedSelector);
  const totalCount = list.length;
  return _isAllChecked(checkedCount, totalCount);
}

function _isHalfChecked(checkedCount: number, totalCount: number): boolean {
  // 若勾选数量或总数有0，不认为是半选
  return !!(checkedCount && totalCount) && totalCount !== checkedCount;
}
/**
 * 通用列表半勾选计算逻辑
 * @param list 列表
 * @param checkedSelector 列表项勾选状态选择器
 * @returns 列表状态是否为半勾选
 */
export function isHalfChecked<T>(list: T[], checkedSelector: Selector<T, boolean>): boolean {
  const checkedCount = getCheckedCount(list, checkedSelector);
  const totalCount = list.length;
  return _isHalfChecked(checkedCount, totalCount);
}

export interface ICheckedStatus {
  isAllChecked: boolean;
  isHalfChecked: boolean;
}
/**
 * 通用列表勾选状态计算
 * @param list 列表
 * @param checkedSelector 列表项勾选状态选择器
 * @returns 列表勾选状态
 */
export function getListCheckedStatus<T>(list: T[], checkedSelector: Selector<T, boolean>): ICheckedStatus {
  const checkedCount = getCheckedCount(list, checkedSelector);
  const totalCount = list.length;
  return {
    isAllChecked: _isAllChecked(checkedCount, totalCount),
    isHalfChecked: _isHalfChecked(checkedCount, totalCount),
  };
}

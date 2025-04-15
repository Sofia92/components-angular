// tslint:disable typedef
export function selectFilterOption(...names: string[]) {
  return (inputValue: string, option: any) => {
    const { nzValue, nzDisabled } = option;
    if (nzDisabled) {
      return false;
    }
    return isMatchedOption(inputValue, nzValue, names);
  };
}

// select object compareFn
export function selectCompareFn(name: string = 'id') {
  return (o1: any, o2: any) => {
    return o1 && o2 ? (o1[name] === o2 || o1[name] === o2[name] || o1 === o2[name]) : o1 === o2;
  };
}

// select 选项前端搜 判断option是否 匹配
export function isMatchedOption(value: string = '', option: any, names: string[] = []): boolean {
  // 去除特殊字符
  // tslint:disable-next-line
  const _replaceSpecialChar = (str: string): string => {
    return str.replace(/\.|\(|\)|\/|、|×|-/g, '');
  };

  // tslint:disable-next-line
  const _isMatched = (text: string, target: string): boolean => {
    const textFormat = _replaceSpecialChar(text.toLowerCase());
    const targetFormat = _replaceSpecialChar(target.toLowerCase());
    return targetFormat.indexOf(textFormat) !== -1;
  };

  if (typeof option === 'string') {
    return _isMatched(value, option);
  }
  const index = ['py', 'wb', 'name', 'id', ...names].findIndex((name) => {
    return _isMatched(value, option[name] || '');
  });

  return index !== -1;
}

export function matchCount(source: string, keyword: string, item: any, prefixOrSuffix = false): number {
  if (!source || !keyword) return 0;
  let qz = 0;
  if (prefixOrSuffix) {
    if (source.startsWith(keyword) || source.endsWith(keyword)) {
      qz = source == keyword ? 100 : keyword.length;
      item.qz += qz;
    }
  } else {
    const regex = new RegExp(keyword, 'gi');
    qz = source == keyword ? 100 : (source.match(regex) || []).length;
    item.qz += qz;
  }
  return qz;
}
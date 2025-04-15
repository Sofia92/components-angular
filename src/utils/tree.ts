interface ITree<T> {
  key: string;
  isLeaf?: boolean;
  children?: T[];
}

export function flatTree<T extends ITree<T>>(
  treeData: T[]): Map<string, T> {
  const flatMap = new Map();
  const flatFunc = (nodes: T[]) => {
    nodes.forEach((item) => {
      flatMap.set(item.key, item);
      flatFunc(item.children || []);
    });
  };
  flatFunc(treeData);
  return flatMap;
}

export function omitNullTree<T extends ITree<T>>(treeData: T[]) {
  return treeData.filter((node) => {
    if (node.isLeaf === true) {
      return true;
    }
    if (node.children?.length) {
      node.children = omitNullTree(node.children);
    }
    return node.children?.length > 0;
  });
}

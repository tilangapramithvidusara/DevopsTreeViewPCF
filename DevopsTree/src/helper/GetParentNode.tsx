interface Node {
  title: string;
  key: string;
  rest: {
    // Rest of the node properties
  };
  children: Node[];
}

interface TreeProps {
  treeData: Node[];
}

export const findNodeAndRelations = (treeData: Node[], targetKey: string, result: Node[] = []): Node[] | null => {
  for (const node of treeData) {
    if (node.key === targetKey) {
      result?.push(node);
      return result;
    }

    if (node.children && node.children.length > 0) {
      const foundNode = findNodeAndRelations(node?.children, targetKey, result);
      if (foundNode) {
        result?.push(node);
        return result;
      }
    }
  }

  return null;
};
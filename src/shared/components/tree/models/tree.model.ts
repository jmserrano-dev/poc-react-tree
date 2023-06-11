export type TreeNode<TData> = Pick<TreeNodeInternal<TData>, "id" | "data">;

export type TreeNodeInternal<TData> = {
  id: number;
  data: TData;
  level?: number;
  loading: boolean;
  expanded: boolean;
  childrenLoaded: boolean;
  children: TreeNodeInternal<TData>[];
};

export const initializeNode = <TData>(
  node: TreeNode<TData>
): TreeNodeInternal<TData> => {
  return {
    ...node,
    children: [],
    loading: false,
    expanded: false,
    childrenLoaded: false,
  };
};

export const toggleNode = <TData>(
  rootNode: TreeNodeInternal<TData>,
  currentNode: TreeNode<TData>
): TreeNodeInternal<TData> => {
  if (rootNode.id === currentNode.id) {
    return { ...rootNode, expanded: !rootNode.expanded };
  }

  return {
    ...rootNode,
    children: rootNode.children.map((node) => toggleNode(node, currentNode)),
  };
};

export const addNode = <TData>(
  rootNode: TreeNodeInternal<TData>,
  parentNode: TreeNodeInternal<TData>,
  childNode: TreeNodeInternal<TData>
): TreeNodeInternal<TData> => {
  if (rootNode.id === parentNode.id) {
    return {
      ...rootNode,
      children: [...rootNode.children, childNode],
    };
  }

  return {
    ...rootNode,
    children: rootNode.children.map((node) =>
      addNode(node, parentNode, childNode)
    ),
  };
};

export const addChidrenNodes = <TData>(
  rootNode: TreeNodeInternal<TData>,
  parentNode: TreeNode<TData>,
  childrenNodes: TreeNode<TData>[]
): TreeNodeInternal<TData> => {
  if (rootNode.id === parentNode.id) {
    return {
      ...rootNode,
      childrenLoaded: true,
      children: [...rootNode.children, ...childrenNodes.map(initializeNode)],
    };
  }

  return {
    ...rootNode,
    children: rootNode.children.map((node) =>
      addChidrenNodes(node, parentNode, childrenNodes)
    ),
  };
};

export const removeNode = <TData>(
  rootNode: TreeNodeInternal<TData>,
  nodeToRemove: TreeNode<TData>
): TreeNodeInternal<TData> | null => {
  if (rootNode.id === nodeToRemove.id) {
    return null;
  }

  return {
    ...rootNode,
    children: rootNode.children
      .map((node) => removeNode(node, nodeToRemove))
      .filter((node) => node != null),
  } as TreeNodeInternal<TData>;
};

export const getAllNodes = <TData>(
  nodes: TreeNodeInternal<TData>[],
  level = 0
): TreeNodeInternal<TData>[] => {
  return nodes.reduce((previous, node) => {
    let nodes = [{ ...node, level } as TreeNodeInternal<TData>];

    if (node.expanded) {
      nodes = nodes.concat(...getAllNodes(node.children, level + 1));
    }

    return [...previous, ...nodes];
  }, [] as TreeNodeInternal<TData>[]);
};
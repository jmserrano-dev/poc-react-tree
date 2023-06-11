import { TreeNode, TreeNodeInternal } from "../models/tree.model";
import { useCallback, useRef } from "react";

export type TreeOnDragType<TData> = (
  node: TreeNode<TData>,
  parentNode: TreeNode<TData>
) => Promise<void>;

type UseTreeDraggableProps<TData> = (
  from: TreeNodeInternal<TData>,
  to: TreeNodeInternal<TData>
) => void;

export const useTreeDraggable = <TData>(
  onDrag: UseTreeDraggableProps<TData>
) => {
  const node = useRef<TreeNodeInternal<TData>>();
  const parentNode = useRef<TreeNodeInternal<TData>>();

  return useCallback(
    (currentNode: TreeNodeInternal<TData>) => ({
      draggable: true,
      onDragStart: () => {
        node.current = currentNode;
      },
      onDragOver: () => {
        parentNode.current = currentNode;
      },
      onDragEnd: () => {
        onDrag(node.current!, parentNode.current!);
      },
    }),
    [onDrag]
  );
};

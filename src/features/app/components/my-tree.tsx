import { MyTreeNode, MyTreeNodeData } from "./my-tree-node";
import {
  Tree,
  TreeOnDragType,
  TreeOnLoadType,
  TreeOnRemoveType,
} from "../../../shared/components/tree";

import { useCallback } from "react";

export const MyTree = () => {
  const handleLoad: TreeOnLoadType<MyTreeNodeData> = useCallback((node) => {
    const NUMBER_OF_ELEMENTS_FOR_LEVEL = 100;

    if (node == null) {
      return Promise.resolve(
        Array.from({ length: NUMBER_OF_ELEMENTS_FOR_LEVEL }, (_, index) => ({
          id: index + 1,
          data: { myProperty: "property" },
        }))
      );
    }

    return Promise.resolve(
      Array.from({ length: NUMBER_OF_ELEMENTS_FOR_LEVEL }, (_, index) => ({
        id: node.id * NUMBER_OF_ELEMENTS_FOR_LEVEL + index + 1,
        data: { myProperty: "property" },
      }))
    );
  }, []);

  const handleDrag: TreeOnDragType<MyTreeNodeData> = useCallback(() => {
    return Promise.resolve();
  }, []);

  const handleRemove: TreeOnRemoveType<MyTreeNodeData> = useCallback(() => {
    return Promise.resolve();
  }, []);

  return (
    <Tree
      Node={MyTreeNode}
      onLoad={handleLoad}
      onDrag={handleDrag}
      onRemove={handleRemove}
    />
  );
};

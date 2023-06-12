import { MyTreeNode, MyTreeNodeData } from "./my-tree-node";
import {
  Tree,
  TreeOnDragType,
  TreeOnLoadType,
  TreeOnRemoveType,
} from "../../../shared/components/tree";

import { TreeOnSelectType } from "../../../shared/components/tree/hooks/tree.hook";
import { useCallback } from "react";

export const MyTree = () => {
  const handleLoad: TreeOnLoadType<MyTreeNodeData> = useCallback((node) => {
    const DELAY_IN_MS = 500;
    const NUMBER_OF_ELEMENTS_FOR_LEVEL = 10;

    return new Promise((resolve) => {
      setTimeout(() => {
        if (node == null) {
          resolve(
            Array.from(
              { length: NUMBER_OF_ELEMENTS_FOR_LEVEL },
              (_, index) => ({
                id: index + 1,
                data: { myProperty: "property" },
              })
            )
          );
        } else {
          resolve(
            Array.from(
              { length: NUMBER_OF_ELEMENTS_FOR_LEVEL },
              (_, index) => ({
                id: node.id * NUMBER_OF_ELEMENTS_FOR_LEVEL + index + 1,
                data: { myProperty: "property" },
              })
            )
          );
        }
      }, DELAY_IN_MS);
    });
  }, []);

  const handleDrag: TreeOnDragType<MyTreeNodeData> = useCallback(() => {
    return Promise.resolve();
  }, []);

  const handleRemove: TreeOnRemoveType<MyTreeNodeData> = useCallback(() => {
    return Promise.resolve();
  }, []);

  const handleOnSelect: TreeOnSelectType<MyTreeNodeData> = useCallback((node) => {
    console.info(node);
  }, []);

  return (
    <Tree
      nodeHeigth={40}
      Node={MyTreeNode}
      onLoad={handleLoad}
      onDrag={handleDrag}
      onRemove={handleRemove}
      onSelect={handleOnSelect}
    />
  );
};

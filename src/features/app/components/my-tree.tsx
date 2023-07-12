import './my-tree-node.css'
import './my-tree.css'

import { MyTreeNode, MyTreeNodeData } from "./my-tree-node";
import {
  Tree,
  TreeNodeComponentRef,
  TreeOnDragType,
  TreeOnLoadType,
  TreeOnRemoveType,
  TreeOnSelectType,
} from "../../../shared/components/tree";
import { useCallback, useRef } from "react";

export const MyTree = () => {
  const treeRef = useRef<TreeNodeComponentRef>(null);
  
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
                children: [{
                  id: (index + 1) * NUMBER_OF_ELEMENTS_FOR_LEVEL + 1,
                }]
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

  const handleOnSelect: TreeOnSelectType<MyTreeNodeData> = useCallback(
    (node) => {
      console.info(node);
    },
    []
  );

  const handleUnSelect = () => {
    treeRef.current?.unSelect();
  }

  return (
    <>
      <div>
        <button type="button" onClick={handleUnSelect} >UnSelect</button>
      </div>
      <div className='tree-container'>
        <Tree
          ref={treeRef}
          nodeHeigth={40}
          Node={MyTreeNode}
          onLoad={handleLoad}
          onDrag={handleDrag}
          onRemove={handleRemove}
          onSelect={handleOnSelect}
        />
      </div>
    </>
  );
};

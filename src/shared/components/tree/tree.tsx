import { TreeOnDragType, useTreeDraggable } from "./hooks/tree-draggable.hook";
import { TreeOnLoadType, TreeOnRemoveType, useTree } from "./hooks/tree.hook";

import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import React from "react";
import { TreeNode } from "./models/tree.model";

export type TreeNodeComponent<TData> = (_: {
  level: number;
  loading: boolean;
  expanded: boolean;
  node: TreeNode<TData>;
  style: React.CSSProperties;
  onToggle: () => void;
  onRemove: () => void;
}) => JSX.Element;

type TreeProps<TData> = {
  nodeHeigth: number;
  Node: TreeNodeComponent<TData>;
  onLoad: TreeOnLoadType<TData>;
  onDrag: TreeOnDragType<TData>;
  onRemove: TreeOnRemoveType<TData>;
};

export function Tree<TData>({
  nodeHeigth,
  Node,
  onDrag,
  ...props
}: TreeProps<TData>) {
  const { tree, dispatch, handleToggle, handleRemove } = useTree(props);

  const draggablePropsFn = useTreeDraggable<TData>((node, parentNode) => {
    onDrag(node, parentNode).then(() => {
      dispatch({ type: "MOVE_NODE", payload: { node, parentNode } });
    });
  });

  return (
    <AutoSizer>
      {({ width, height }) => (
        <FixedSizeList
          width={width}
          height={height}
          itemSize={nodeHeigth}
          itemCount={tree.length}
        >
          {({ index, style }) => {
            const node = tree[index];

            return (
              <Node
                key={node.id}
                node={node}
                style={style}
                loading={node.loading}
                level={node.level || 0}
                expanded={node.expanded}
                {...draggablePropsFn(node)}
                onToggle={() => handleToggle(node)}
                onRemove={() => handleRemove(node)}
              />
            );
          }}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
}

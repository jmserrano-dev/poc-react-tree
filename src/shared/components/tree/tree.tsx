import React, { useMemo } from "react";
import { TreeNode, TreeNodeInternal, getAllNodes } from "./models/tree.model";
import { TreeOnDragType, useTreeDraggable } from "./hooks/tree-draggable.hook";
import { TreeOnLoadType, TreeOnRemoveType, useTree } from "./hooks/tree.hook";

import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";

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
  Node: TreeNodeComponent<TData>;
  onLoad: TreeOnLoadType<TData>;
  onDrag: TreeOnDragType<TData>;
  onRemove: TreeOnRemoveType<TData>;
};

export function Tree<TData>({ Node, onDrag, ...props }: TreeProps<TData>) {
  const { state, dispatch, handleToggle, handleRemove } = useTree(props);

  const draggablePropsFn = useTreeDraggable<TData>((node, parentNode) => {
    onDrag(node, parentNode).then(() => {
      dispatch({ type: "MOVE_NODE", payload: { node, parentNode } });
    });
  });

  const nodes = useMemo((): TreeNodeInternal<TData>[] => {
    return getAllNodes(state.nodes);
  }, [state.nodes]);

  return (
    <AutoSizer>
      {({ width, height }) => (
        <FixedSizeList
          itemSize={35}
          width={width}
          height={height}
          itemCount={nodes.length}
        >
          {({ index, style }) => {
            const node = nodes[index];

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

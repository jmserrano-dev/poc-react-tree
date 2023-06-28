import React, { Ref, RefAttributes, forwardRef, useImperativeHandle } from "react";
import { TreeOnDragType, useTreeDraggable } from "./hooks/tree-draggable.hook";
import { TreeOnLoadType, TreeOnRemoveType, TreeOnSelectType, useTree } from "./hooks/tree.hook";

import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import { TreeNode } from "./models/tree.model";

export type TreeNodeComponentRef = {
  unSelect: () => void;
}

export type TreeNodeComponent<TData> = (_: {
  level: number;
  loading: boolean;
  expanded: boolean;
  selected: boolean;
  node: TreeNode<TData>;
  style: React.CSSProperties;
  onToggle: () => void;
  onRemove: () => void;
  onSelect: () => void;
}) => JSX.Element;

type TreeProps<TData> = {
  nodeHeigth: number;
  Node: TreeNodeComponent<TData>;
  onLoad: TreeOnLoadType<TData>;
  onDrag: TreeOnDragType<TData>;
  onRemove: TreeOnRemoveType<TData>;
  onSelect: TreeOnSelectType<TData>;
};

export const Tree = forwardRef(<TData extends object>({
  nodeHeigth,
  Node,
  onDrag,
  ...props
}: TreeProps<TData>, ref: Ref<TreeNodeComponentRef>) => {
  const { tree, dispatch, handleToggle, handleRemove, handleSelect, handleUnSelect } = useTree(props);

  const draggablePropsFn = useTreeDraggable<TData>((node, parentNode) => {
    onDrag(node, parentNode).then(() => {
      dispatch({ type: "MOVE_NODE", payload: { node, parentNode } });
    });
  });

  useImperativeHandle(
    ref,
    () => ({
      unSelect: handleUnSelect
    })
  )

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
                selected={node.selected}
                {...draggablePropsFn(node)}
                onToggle={() => handleToggle(node)}
                onRemove={() => handleRemove(node)}
                onSelect={() => handleSelect(node)}
              />
            );
          }}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
}) as <TData extends object> (props: TreeProps<TData> & RefAttributes<TreeNodeComponentRef>) => JSX.Element;

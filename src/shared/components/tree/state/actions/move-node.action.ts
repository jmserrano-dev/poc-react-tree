import { TreeNodeInternal, addNode, removeNode } from "../../models/tree.model";

import { TreeState } from "../tree.state";

export type MoveNodeAction<TData> = {
  type: "MOVE_NODE";
  payload: {
    node: TreeNodeInternal<TData>;
    parentNode: TreeNodeInternal<TData>;
  };
};

export const moveNodeActionHandler = <TData>(
  state: TreeState<TData>,
  action: MoveNodeAction<TData>
): TreeState<TData> => {
  const { node, parentNode } = action.payload;

  if (
    node.id === parentNode.id ||
    parentNode.children.some((child) => child.id === node.id)
  ) {
    return state;
  }

  const removeNodeState = {
    ...state,
    nodes: state.nodes
      .map((rootNode) => removeNode(rootNode, node))
      .filter((node) => node != null) as TreeNodeInternal<TData>[],
  };

  return {
    ...removeNodeState,
    nodes: removeNodeState.nodes.map((rootNode) => {
      return addNode(rootNode, parentNode, node);
    }),
  };
};

import {
  TreeNode,
  TreeNodeInternal,
  removeNode,
} from "../../models/tree.model";

import { TreeState } from "../tree.state";

export type RemoveNodeAction<TData> = {
  type: "REMOVE_NODE";
  payload: { node: TreeNode<TData> };
};

export const removeNodeActionHandler = <TData>(
  state: TreeState<TData>,
  action: RemoveNodeAction<TData>
): TreeState<TData> => {
  const { node } = action.payload;

  return {
    ...state,
    nodes: state.nodes
      .map((rootNode) => removeNode(rootNode, node))
      .filter((node) => node != null) as TreeNodeInternal<TData>[],
  };
};

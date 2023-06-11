import { TreeNode, toggleNode } from "../../models/tree.model";

import { TreeState } from "../tree.state";

export type ToggleNodeAction<TData> = {
  type: "TOGGLE_NODE";
  payload: { node: TreeNode<TData> };
};

export const toggleActionHandler = <TData>(
  state: TreeState<TData>,
  action: ToggleNodeAction<TData>
): TreeState<TData> => {
  const { node } = action.payload;

  return {
    ...state,
    nodes: state.nodes.map((rootNode) => {
      return toggleNode(rootNode, node);
    }),
  };
};

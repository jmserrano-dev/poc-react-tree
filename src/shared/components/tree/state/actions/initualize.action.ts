import { TreeNode, initializeNode } from "../../models/tree.model";

import { TreeState } from "../tree.state";

export type InitializeAction<TData> = {
  type: "INITIALIZE";
  payload: { nodes: TreeNode<TData>[] };
};

export const initializeActionHandler = <TData>(
  state: TreeState<TData>,
  action: InitializeAction<TData>
): TreeState<TData> => {
  const { nodes } = action.payload;

  return {
    ...state,
    nodes: nodes.map(initializeNode),
  };
};

import { TreeNode, addChidrenNodes } from "../../models/tree.model";

import { TreeState } from "../tree.state";

export type AddNodesAction<TData> = {
  type: "ADD_NODES";
  payload: {
    parentNode: TreeNode<TData>;
    childrenNodes: TreeNode<TData>[];
  };
};

export const addNodesActionHandler = <TData>(
  state: TreeState<TData>,
  action: AddNodesAction<TData>
): TreeState<TData> => {
  const { parentNode, childrenNodes } = action.payload;

  return {
    ...state,
    nodes: state.nodes.map((rootNode) => {
      return addChidrenNodes(rootNode, parentNode, childrenNodes);
    }),
  };
};

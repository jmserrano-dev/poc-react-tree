import { TreeNodeInternal, selectNode } from "../../models/tree.model";

import { TreeState } from "../tree.state";

export type SelectNodeAction<TData> = {
  type: "SELECT_NODE";
  payload: {
    node: TreeNodeInternal<TData>;
  };
};

export const selectNodeActionHandler = <TData>(
  state: TreeState<TData>,
  action: SelectNodeAction<TData>
): TreeState<TData> => {
  const { node } = action.payload;

  return {
    ...state,
    nodes: state.nodes.map((rootNode) =>
      selectNode(rootNode, node)
    ),
  };
};

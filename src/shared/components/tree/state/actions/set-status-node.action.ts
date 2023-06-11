import { TreeNodeInternal, setStatusNode } from "../../models/tree.model";

import { TreeState } from "../tree.state";

export type SetStatusNodeAction<TData> = {
  type: "SET_STATUS_NODE";
  payload: {
    loading: boolean;
    node: TreeNodeInternal<TData>;
  };
};

export const setStatusNodeActionHandler = <TData>(
  state: TreeState<TData>,
  action: SetStatusNodeAction<TData>
): TreeState<TData> => {
  const { node, loading } = action.payload;

  return {
    ...state,
    nodes: state.nodes.map((rootNode) =>
      setStatusNode(rootNode, node, loading)
    ),
  };
};

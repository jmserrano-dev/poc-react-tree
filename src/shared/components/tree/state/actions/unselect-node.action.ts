import { TreeState } from "../tree.state";
import { unSelectNode } from "../../models/tree.model";

export type UnSelectNodeAction = {
  type: "UNSELECT_NODE";
};

export const unSelectNodeActionHandler = <TData>(
  state: TreeState<TData>,
): TreeState<TData> => {

  return {
    ...state,
    nodes: state.nodes.map((rootNode) =>
      unSelectNode(rootNode)
    ),
  };
};

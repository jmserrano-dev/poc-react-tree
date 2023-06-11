import { addNodesActionHandler } from "./actions/add-nodes.action";
import { initializeActionHandler } from "./actions/initualize.action";
import { moveNodeActionHandler } from "./actions/move-node.action";
import { removeNodeActionHandler } from "./actions/remove-nodeAction";
import { toggleActionHandler } from "./actions/toggle-node.action";
import { TreeAction, TreeState } from "./tree.state";

export type TreeReducer<TData> = typeof treeReducer<TData>;

export const treeReducer = <TData>(
  state: TreeState<TData>,
  action: TreeAction<TData>
): TreeState<TData> => {
  const actionFn: Record<
    (typeof action)["type"],
    (state: TreeState<TData>, action: any) => TreeState<TData>
  > = {
    INITIALIZE: initializeActionHandler,
    TOGGLE_NODE: toggleActionHandler,
    ADD_NODES: addNodesActionHandler,
    REMOVE_NODE: removeNodeActionHandler,
    MOVE_NODE: moveNodeActionHandler,
  };

  return actionFn[action.type]?.(state, action) ?? state;
};

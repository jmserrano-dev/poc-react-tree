import { AddNodesAction } from "./actions/add-nodes.action";
import { InitializeAction } from "./actions/initialize.action";
import { MoveNodeAction } from "./actions/move-node.action";
import { RemoveNodeAction } from "./actions/remove-nodeAction";
import { SelectNodeAction } from "./actions/select-node.action";
import { SetStatusNodeAction } from "./actions/set-status-node.action";
import { ToggleNodeAction } from "./actions/toggle-node.action";
import { TreeNodeInternal } from "../models/tree.model";
import { UnSelectNodeAction } from './actions/unselect-node.action';

export type TreeState<TData> = {
  nodes: TreeNodeInternal<TData>[];
};

export type TreeAction<TData> =
  | InitializeAction<TData>
  | ToggleNodeAction<TData>
  | AddNodesAction<TData>
  | RemoveNodeAction<TData>
  | MoveNodeAction<TData>
  | SetStatusNodeAction<TData>
  | SelectNodeAction<TData>
  | UnSelectNodeAction;

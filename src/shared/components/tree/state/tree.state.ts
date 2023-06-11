import { AddNodesAction } from "./actions/add-nodes.action";
import { InitializeAction } from "./actions/initualize.action";
import { MoveNodeAction } from "./actions/move-node.action";
import { RemoveNodeAction } from "./actions/remove-nodeAction";
import { ToggleNodeAction } from "./actions/toggle-node.action";
import { TreeNodeInternal } from "../models/tree.model";

export type TreeState<TData> = {
  nodes: TreeNodeInternal<TData>[];
};

export type TreeAction<TData> =
  | InitializeAction<TData>
  | ToggleNodeAction<TData>
  | AddNodesAction<TData>
  | RemoveNodeAction<TData>
  | MoveNodeAction<TData>;

import { TreeNode, TreeNodeInternal, getAllNodes } from "../models/tree.model";
import { TreeReducer, treeReducer } from "../state/tree.reducer";
import { useEffect, useMemo, useReducer } from "react";

export type TreeOnLoadType<TData> = (
  node: TreeNode<TData> | null
) => Promise<TreeNode<TData>[]>;

export type TreeOnRemoveType<TData> = (
  node: TreeNode<TData> | null
) => Promise<void>;

type UseTreeProps<TData> = {
  onLoad: TreeOnLoadType<TData>;
  onRemove: TreeOnRemoveType<TData>;
};

export const useTree = <TData>({ onLoad, onRemove }: UseTreeProps<TData>) => {
  const [state, dispatch] = useReducer<TreeReducer<TData>>(treeReducer, {
    nodes: [],
  });

  const tree = useMemo((): TreeNodeInternal<TData>[] => {
    return getAllNodes(state.nodes);
  }, [state.nodes]);

  useEffect(() => {
    onLoad(null).then((nodes) => {
      dispatch({ type: "INITIALIZE", payload: { nodes } });
    });
  }, [onLoad]);

  const handleToggle = (node: TreeNodeInternal<TData>) => {
    if (node.childrenLoaded) {
      dispatch({ type: "TOGGLE_NODE", payload: { node } });
    } else {
      dispatch({ type: "SET_STATUS_NODE", payload: { node, loading: true } });

      onLoad(node)
        .then((nodes) => {
          dispatch({
            type: "ADD_NODES",
            payload: { parentNode: node, childrenNodes: nodes },
          });
        })
        .then(() => {
          dispatch({
            type: "TOGGLE_NODE",
            payload: { node },
          });
        })
        .finally(() => {
          dispatch({
            type: "SET_STATUS_NODE",
            payload: { node, loading: false },
          });
        });
    }
  };

  const handleRemove = (node: TreeNodeInternal<TData>) => {
    onRemove(node).then(() => {
      dispatch({ type: "REMOVE_NODE", payload: { node } });
    });
  };

  return {
    tree,
    dispatch,
    handleToggle,
    handleRemove,
  };
};

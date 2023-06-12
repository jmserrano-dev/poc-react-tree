import "./my-tree-node.css";

import { TreeNodeComponent } from "../../../shared/components/tree";
import classNames from "classnames";

export type MyTreeNodeData = { myProperty: string };

export const MyTreeNode: TreeNodeComponent<MyTreeNodeData> = ({
  node,
  level,
  style,
  loading,
  expanded,
  selected,
  onToggle,
  onRemove,
  onSelect,
  ...props
}) => {
  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onToggle();
  };

  const handleRemove = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onRemove();
  };

  const handleOnSelect = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onSelect();
  };

  return (
    <div
      {...props}
      style={{ ...style, "--my-tree-node-level": level } as React.CSSProperties}
    >
      <div
        className={classNames("my-tree-node", {
          "my-tree-node--selected": selected,
        })}
      >
        {expanded && <span onClick={handleToggle}>⬇️</span>}
        {!expanded && <span onClick={handleToggle}>▶️</span>}
        {loading && <span>⏳</span>}
        <span className="my-tree-node__label" onClick={handleOnSelect}>
          LABEL {node.id}
        </span>
        <span onClick={handleRemove}>🗑️</span>
      </div>
    </div>
  );
};

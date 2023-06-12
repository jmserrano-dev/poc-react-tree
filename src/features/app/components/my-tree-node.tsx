import { TreeNodeComponent } from "../../../shared/components/tree";

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
    <li
      {...props}
      style={{ ...style, paddingLeft: 20 * level, backgroundColor: selected ? "lightblue" : "transparent" }}
    >
      {expanded && <span onClick={handleToggle}>⬇️</span>}
      {!expanded && <span onClick={handleToggle}>▶️</span>}
      {loading && <span>⏳</span>}
      <span onClick={handleOnSelect}>LABEL {node.id}</span>
      <span onClick={handleRemove}>🗑️</span>
    </li>
  );
};

import { TreeNodeComponent } from "../../../shared/components/tree";

export type MyTreeNodeData = { myProperty: string };

export const MyTreeNode: TreeNodeComponent<MyTreeNodeData> = ({
  node,
  level,
  style,
  loading,
  expanded,
  onToggle,
  onRemove,
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

  return (
    <li
      {...props}
      style={{ ...style, paddingLeft: 20 * level }}
      onClick={handleToggle}
    >
      {expanded ? <span>⬇️</span> : undefined}
      {!expanded ? <span>▶️</span> : undefined}
      <span>LABEL {node.id}</span>
      <span onClick={handleRemove}>🗑️</span>
    </li>
  );
};

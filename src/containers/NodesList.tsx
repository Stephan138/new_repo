import { useAtom } from "jotai";
import { TNode } from "../api/models/nodes-model";
import { Card } from "../components/Card/Card";
import { NodeIcon } from "./NodeIcon";
import { selectionAtom } from "../store/folder-atom";

type Props = {
  nodes: TNode[];
  onNavigate?: (id: string) => void;
  onContext?: (e: React.MouseEvent<Element, MouseEvent>) => void;
};

export const NodesList: React.FC<Props> = ({
  nodes,
  onNavigate,
  onContext,
}) => {
  const [selection, setSelection] = useAtom(selectionAtom);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
      }}
      onClick={() => {
        setSelection(null);
      }}
    >
      {nodes.map((node) => (
        <Card
          key={node.id}
          label={node.name}
          icon={<NodeIcon nodeType={node.type} />}
          selected={(selection && selection.id === node.id) || false}
          onSelect={() => setSelection(node)}
          onContext={onContext}
          onDoubleClick={() => onNavigate && onNavigate(node.id)}
        />
      ))}
    </div>
  );
};

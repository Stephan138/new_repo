import { useParents } from "../api/hooks/useParents";
import { TParent } from "../api/models/nodes-model";
import { ChoiceChip } from "../components/ChoiceChip";

type Props = {
  parent?: TParent;
  onClick?: (id: string | null) => void;
  onAction?: React.MouseEventHandler<HTMLDivElement>;
};

export const FoldersChain: React.FC<Props> = ({
  parent,
  onClick,
  onAction,
}) => {
  const { parents } = useParents(parent?.parentId);

  const resetSelection = () => onClick && onClick(null);
  const selectNode = (id: string) => onClick && onClick(id);

  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      <ChoiceChip
        label="Мой диск"
        onClick={!parents?.length ? onAction : resetSelection}
        current={!parents?.length}
      />
      {parents &&
        parents.reverse().map((node, index) => {
          return parents.length - 1 === index ? (
            <ChoiceChip
              key={node.id}
              label={parent?.name!}
              current
              onClick={onAction}
            />
          ) : (
            <ChoiceChip
              key={node.id}
              label={node.name}
              onClick={() => selectNode(node.id)}
            />
          );
        })}
    </div>
  );
};

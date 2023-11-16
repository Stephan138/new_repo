import { EditIcon, TrashIcon } from "../assets/icons";
import { Menu } from "../components/Menu";
import { Popup } from "../components/Popup";
import { TUsePopup } from "../hooks/usePopup";

type Props = {
  state: TUsePopup;
  renameNode?: () => void;
  deleteNode?: () => void;
};

export const ContextPopup: React.FC<Props> = ({
  state,
  renameNode,
  deleteNode,
}) => {
  const handleRename = () => {
    state.close();
    renameNode && renameNode();
  };

  const nandleDelete = () => {
    state.close();
    deleteNode && deleteNode();
  };

  return (
    <Popup
      position={state.position}
      isVisible={state.visible}
      onClose={state.close}
    >
      <Menu
        icon={<EditIcon width={24} height={24} />}
        onClick={handleRename}
        title="Переименовать"
      />
      <Menu
        icon={<TrashIcon width={24} height={24} />}
        onClick={nandleDelete}
        title="Удалить"
      />
    </Popup>
  );
};

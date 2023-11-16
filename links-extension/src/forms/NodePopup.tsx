import { FolderItemIcon, LinkItemIcon } from "../assets/icons";
import { Menu } from "../components/Menu";
import { Popup } from "../components/Popup";
import { TUsePopup } from "../hooks/usePopup";

type Props = {
  state: TUsePopup;
  createFolder?: () => void;
  createLink?: () => void;
};

export const NodePopup: React.FC<Props> = ({
  state,
  createFolder,
  createLink,
}) => {
  const handleCreateFolder = () => {
    state.close();
    createFolder && createFolder();
  };

  const handleCreateLink = () => {
    state.close();
    createLink && createLink();
  };

  return (
    <Popup
      position={state.position}
      isVisible={state.visible}
      onClose={state.close}
    >
      <Menu
        icon={<FolderItemIcon width={24} height={24} />}
        onClick={handleCreateFolder}
        title="Папка"
      />
      <Menu
        icon={<LinkItemIcon width={24} height={24} />}
        onClick={handleCreateLink}
        title="Ссылка"
      />
    </Popup>
  );
};

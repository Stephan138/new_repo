import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../api/hooks/useAuth";
import { Content, Header, Side } from "../layouts";
import { FoldersPanel } from "../containers/FoldersPanel";
import { useFolder } from "../api/hooks/useFolder";
import { useIsFetching, useIsMutating } from "react-query";
import { useEffect, useState } from "react";
import { LogoutIcon, UserIcon } from "../assets/icons";
import { usePopup } from "../hooks/usePopup";
import { Popup } from "../components/Popup";
import { Menu } from "../components/Menu";

export const ProtectedRoot = () => {
  useAuth();

  const { root, refetch } = useFolder();
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const [loading, setLoading] = useState(false);

  const isMutating = useIsMutating();
  const isFetching = useIsFetching();

  useEffect(() => {
    refetch();
  }, [isMutating]);

  useEffect(() => {
    setLoading(isFetching > 0 || isMutating > 0);
  }, [isMutating, isFetching]);

  const userPopup = usePopup();

  return (
    <>
      <Header loading={loading}>
        <UserIcon onClick={userPopup.open} />
        <Popup
          title="Мой профиль"
          isVisible={userPopup.visible}
          position={userPopup.position}
          onClose={userPopup.close}
        >
          <Menu icon={<LogoutIcon />} title="Выйти" onClick={logoutUser} />
        </Popup>
      </Header>
      <Content>
        <FoldersPanel root={root || null} onUpdate={refetch} />
        <Outlet />
        <Side />
      </Content>
    </>
  );
};

import { Outlet } from "react-router-dom";
import { useAuth } from "../api/hooks/useAuth";

import { Content, Header } from "../layouts";
import { useEffect, useState } from "react";
import { useIsMutating } from "react-query";

export const Root = () => {
  const [loading, setLoading] = useState(false);
  const isMutating = useIsMutating();

  useEffect(() => {
    setLoading(isMutating > 0);
  }, [isMutating]);

  useAuth();

  return (
    <>
      <Header loading={loading} />
      <Content centered>
        <Outlet />
      </Content>
    </>
  );
};

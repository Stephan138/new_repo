import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { check } from "../services/auth-service";

export const useAuth = () => {
  const { status, error } = useQuery("auth", check, { retry: false });
  const { pathname } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(error);

    if (pathname === "/drive" && status === "error") {
      navigate("/login");
    }

    // if (pathname === "/login" && error === "success") {
    //   navigate("/drive");
    // }
  }, [navigate, pathname, status]);
};

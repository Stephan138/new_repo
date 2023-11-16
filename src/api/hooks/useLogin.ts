import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import { token } from "../services/auth-service";
import { TCredentials, TToken } from "../models";

export const useLogin = () => {
  const navigate = useNavigate();

  const request = (credentials: TCredentials) => {
    return token(credentials);
  };

  const onSuccess = (data: TToken) => {
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("refresh", data.refreshToken);
    navigate("/");
  };

  const { mutate: loginUser } = useMutation(request, { onSuccess });

  return loginUser;
};

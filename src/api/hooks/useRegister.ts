import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import { register } from "../services/auth-service";
import { TCredentials } from "../models";

export const useRegister = () => {
  const navigate = useNavigate();

  const request = (credentials: TCredentials) => {
    return register(credentials);
  };

  const onSuccess = () => {
    navigate("/login");
  };

  const { mutate: registerUser } = useMutation(request, { onSuccess });

  return registerUser;
};

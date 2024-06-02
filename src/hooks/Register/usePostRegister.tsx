/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginRequest, TokenAuthService } from "../../services/hservice";

const usePostRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (requestBody?: LoginRequest) => {
      return TokenAuthService.postRegister(requestBody);
    },
    onSuccess: async (response: any) => {
      if (response) {
        if (response.success) {
          notification.success({ message: response.message, duration: 5 });
          navigate("/login");
        } else {
          notification.error({ message: response.message, duration: 5 });
        }
      }
    },
    onError: async (error: any) => {
      console.error(error);
      notification.error({
        message: "Register failed. Please try again.",
        duration: 5,
      });
    },
  });
};

export default usePostRegister;

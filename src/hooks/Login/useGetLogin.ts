import {
    useMutation,
  } from "react-query";
  import { notification } from "antd";
  import { useDispatch } from "react-redux";
  import { setCredentials } from "../../slice/authSlice";
  import { LoginRequest, TokenAuthService } from "../../services/hservice";

const useGetLogin = () => {
    const dispatch = useDispatch();

    return useMutation({
      mutationFn: async (
        requestBody?: LoginRequest
      ) => {
        return TokenAuthService.postLogin(
          true,
          true,
          requestBody
        );
      },
      onSuccess: async (response: any) => {
        if (response) {
          if (response.success) {
            dispatch(setCredentials({
              tokenType: response.tokenType,
              accessToken: response.accessToken,
              expiresIn: response.expiresIn,
              refreshToken: response.refreshToken,
            }));
            notification.success({ message: response.message, duration: 5 });
          } else {
            notification.error({ message: response.message, duration: 5 });
          }
        }
      },
      onError: async (error: any) => {
        console.error("Mutation error:", error);
        notification.error({ message: "Login failed. Please try again.", duration: 5 });
      },
    });
  };

  export default useGetLogin;

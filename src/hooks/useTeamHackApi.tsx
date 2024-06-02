import { notification } from "antd";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { ApiError, OpenAPI } from "../services/hservice";
import { RootState } from "../store/store";

export function useBmtApi(): {
  dismissError: () => void;
  error: ApiError | undefined;
  isLoading: boolean;
  handleRequest: <T>(request: Promise<T>) => Promise<T | undefined>;
} {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [error, setError] = useState<ApiError | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  OpenAPI.TOKEN = `Bearer ${String(accessToken)}`;

  const handleRequest = useCallback(async function <T>(request: Promise<T>) {
    setIsLoading(true);
    try {
      console.log(`Access token: ${accessToken}`);
      const response = await request;
      setError(undefined);
      return response;
    } catch (exception: any) {
      setError(exception);
      if (exception?.status === 403) {
        notification.error({
          message: exception?.body?.error?.message,
          duration: 5,
        });
        return undefined;
      } else if (exception?.status === 401) {
        return undefined;
      } else if (exception?.body?.error?.message) {
        notification.error({
          message: exception?.body?.error?.message,
          duration: 5,
        });
      } else if (exception?.message === "Forbidden") {
        notification.error({
          message: "Your request is Forbidden!",
          duration: 5,
        });
      } else if (exception.message === "Network Error") {
        notification.error({
          message: "Unable to fetch api",
          duration: 5,
        });
      } else if (exception?.status === 504) {
        console.error("Request timed out:", exception);
      } else if (exception?.body?.error?.validationErrors !== null) {
        notification.error({
          message: "Your request is not valid!",
          duration: 5,
        });
      } else if (exception.message !== null) {
        notification.error({
          message: exception.message,
          duration: 5,
        });
      } else {
        notification.error({
          message: "Unable to fetch api",
          duration: 5,
        });
      }
      throw new Error(exception);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const dismissError = (): void => {
    setError(undefined);
  };

  return { dismissError, error, isLoading, handleRequest };
}

export default useBmtApi;

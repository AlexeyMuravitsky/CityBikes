import { useMemo } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ErrorType = FetchBaseQueryError | SerializedError | undefined;

export const useRequestError = (error: ErrorType) => {
  function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === "object" && error != null && "status" in error;
  }

  function isErrorWithMessage(error: unknown): error is SerializedError {
    return typeof error === "object" && error != null && "message" in error;
  }

  const errorMessage = useMemo(() => {
    if (isFetchBaseQueryError(error)) {
      return error.status;
    }
    if (isErrorWithMessage(error)) {
      return error.message;
    }
    return null;
  }, [error]);

  return {
    isFetchBaseQueryError: isFetchBaseQueryError(error),
    isErrorWithMessage: isErrorWithMessage(error),
    errorMessage,
  };
};

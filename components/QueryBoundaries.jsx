import { Suspense } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Alert, Button, CircularProgress } from '@/components/mui';
import Paragraph from "@/components/Paragraph";

const LoadingView = () => <CircularProgress />;

const ErrorView = ({ error, resetErrorBoundary }) => {
  return (
    <Alert severity="error">
      <Paragraph>{error.message}</Paragraph>
      <Button variant="contained" onClick={resetErrorBoundary}>
        Retry
      </Button>
    </Alert>
  );
};

export const QueryBoundaries = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      onReset={reset}
      FallbackComponent={ErrorView}
      onError={(...args) => console.log(args)}
    >
      <Suspense fallback={<LoadingView />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
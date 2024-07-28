import Button from "@mui/material/Button";
import { useResetErrorBoundaryOnLocationChange } from "react-admin";

const MyError = ({ error, resetErrorBoundary, errorInfo }) => {
  useResetErrorBoundaryOnLocationChange(errorBoundary);

  return (
    <div>
      <h1>Something Went Wrong </h1>
      <div>A client error occurred and your request couldn't be completed.</div>
      {process.env.NODE_ENV !== "production" && (
        <details>
          <h2>{error.message}</h2>
          {errorInfo.componentStack}
        </details>
      )}
      <div>
        <Button onClick={() => history.go(-1)}>Back</Button>
      </div>
    </div>
  );
};

export default MyError;

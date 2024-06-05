import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const WithProtectedRoute = (WrappedComponent: React.FC) => {
  const router = useRouter();
  const user = useSelector((state) => state);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  const innerFunc = (props: {}) => {
    if (!user) {
      // Display a message or loading indicator while redirecting
      return <div>Redirecting to login page...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return innerFunc;
};

export default WithProtectedRoute;

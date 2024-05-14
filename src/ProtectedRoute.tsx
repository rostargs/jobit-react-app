// React
import { ReactNode } from "react";
// Router
import { Navigate } from "react-router-dom";
// Redux
import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";

type TProtectedRoute = {
    children: ReactNode;
};
const ProtectedRoute = ({ children }: TProtectedRoute) => {
    const { currentUser, loading } = useAppSelector((state: RootState) => state.user);

    if (!loading && !currentUser) return <Navigate to={`/auth/login`} />;

    return children;
};

export default ProtectedRoute;

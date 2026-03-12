import react from 'react'
import { Navigate } from "react-router-dom";
import {tokenManager} from "../utils/tokenManager";

type protectedRoutesProps = {
    children: react.ReactNode;
}

function ProtectedRoute({ children }: protectedRoutesProps) {

    const token = tokenManager.getToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
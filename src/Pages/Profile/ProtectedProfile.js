import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedProfile({ children, user}) {
    if(!user){
        return <Navigate to="/login"/>
    }

    console.log(user)

    return children;
}

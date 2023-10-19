import React, { Children } from "react";
import { Navigate } from "react-router-dom";


export default function ProtectedLogin({children, user}){
    if(user?.data?._id === null){
        return <Navigate to="/profile"/>
    }

    return children
}

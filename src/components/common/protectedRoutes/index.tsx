/* eslint-disable no-constant-condition */
import React from "react";
import { Navigate } from "react-router";
import MainPage from "@/screens/main";

const ProtectedRoutes = () => true ? (
    <MainPage/>
  ) : (
    <Navigate to="login" replace />
  );

export default ProtectedRoutes;

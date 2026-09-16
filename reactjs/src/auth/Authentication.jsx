import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore"
import { Outlet, useNavigate } from "react-router";
import Loading from "../components/Loading";

export default function Authentication() {

  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isCheckingAuth && authUser == null) {
      navigate("/login");
    }
  }, [isCheckingAuth, authUser, navigate]);

  if (isCheckingAuth) {
    return <Loading />;
  }

  if (authUser == null) {
    return null;
  }

  return <Outlet />;
}
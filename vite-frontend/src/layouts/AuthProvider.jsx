import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import authService from "../services/auth.service";
import { login, loginProfile } from "../store/authSlice";
import Loader from "../components/Loader/Loader";

const AuthProvider = ({ children, authType }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.authStatus);
  const profileStatus = useSelector((state) => state.profileStatus);
  const profileData = useSelector((state) => state.profileData);
  const dispatch = useDispatch();

  console.log("Profile data:", profileData);

  const updateAuthData = async () => {
    if (!profileStatus || profileData == null) {
      const profile = await authService.getProfile();

      if (
        !(profile == 401 || profile == 500 || profile == null || profile == 404)
      ) {
        dispatch(loginProfile(profile));
      }
    }
    if (!authStatus) {
      const user = await authService.getUser();

      if (!(user == 401 || user == 500 || user == null)) {
        dispatch(login(user));
      }
    }
  };

  useEffect(() => {
    updateAuthData()
      .then(() => {
        if (
          !authStatus &&
          !profileStatus &&
          (authType === "profile" || authType === "non-profile")
        ) {
          navigate("/");
        } else if (
          authStatus &&
          !profileStatus &&
          (authType === false || authType === "profile")
        ) {
          navigate("/create-profile");
        } else if (
          authStatus &&
          profileStatus &&
          (authType === false || authType === "non-profile")
        ) {
          navigate("/dashboard");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate, authStatus, authType, profileStatus]);

  return (
    <>
      {loading ? <Loader /> : children}
      <Outlet />
    </>
  );
};

export default AuthProvider;

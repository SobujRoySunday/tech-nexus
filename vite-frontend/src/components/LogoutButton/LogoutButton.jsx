import { useState } from "react";
import authService from "../../services/auth.service";
import { logout, logoutProfile } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const LogoutButton = ({ className, ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <Loader />}
      <button
        className={`${className} text-sm py-3 px-2`}
        {...props}
        onClick={() => {
          setLoading(true);
          authService
            .logout()
            .then((res) => {
              if (res === 200) {
                dispatch(logout());
                dispatch(logoutProfile());
                navigate("/");
              } else if (res === 401) {
                console.log("Unauthorized");
              } else {
                console.log("Unknown error");
              }
            })
            .finally(() => setLoading(false));
        }}
      >
        Logout
      </button>
    </>
  );
};

export default LogoutButton;

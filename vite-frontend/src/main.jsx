import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import axios from "axios";

import "./index.css";
import { store } from "./store/store";
import AuthProvider from "./layouts/AuthProvider.jsx";
import { Home, Register, CreateProfile, Dashboard } from "./pages";
import Tests from "./pages/Tests/Tests.jsx";
import Test from "./pages/Tests/Test.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import LoggedNav from "./components/Navbar/LoggedNav.jsx";
import AddSkill from "./pages/AddSkill/AddSkill.jsx";

axios.defaults.withCredentials = true;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={
          <AuthProvider authType={false}>
            <Navbar />
          </AuthProvider>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route element={<AuthProvider authType={"non-profile"} />}>
        <Route path="create-profile" element={<CreateProfile />} />
      </Route>
      <Route
        element={
          <AuthProvider authType={"profile"}>
            <LoggedNav />
          </AuthProvider>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tests" element={<Tests />} />
        <Route path="tests/:testID" element={<Test />} />
        <Route
          path="/dashboard/add-skill/:addingSkill"
          element={<AddSkill />}
        />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

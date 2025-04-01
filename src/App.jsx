import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import useNavHelper from "./layout/NavHelper";
import Login from "./pages/login/Login";
import ErrorPage from "./ErrorPage";
import Layout from "./layout/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import CreateUser from "./pages/Admin/User/CreateUser";
import AddWorkProject from "./pages/Admin/Work/AddWorkProject";
import { ToastContainer } from "react-toastify";

const App = () => {
  const UserNav = useNavHelper();
  // console.log({ UserNav });
  const { token } = useSelector((state) => state.auth);
  // console.log(token);
  
  axios.defaults.headers["Authorization"] = "Bearer " + token;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {/* Dynamically render routes if UserNav is an array */}
        {Array.isArray(UserNav) &&
          UserNav.map((nav) => <Route path={nav?.path || "/"} key={nav?.path} element={nav?.component || <></>} />)}
        <Route path="/auth/group/login" element={<Login />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/addWork" element={<AddWorkProject />} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;

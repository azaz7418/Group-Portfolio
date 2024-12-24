import { Outlet } from "react-router-dom";
import MobileNav from "./MobileNav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setAuth } from "../pages/redux/features/authSlice";

// eslint-disable-next-line react/prop-types
const Layout = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getProfile = async () => {
    try {
      const { data: userData } = await axios.get("/users/profile", {
        headers: { Authorization: "Bearer " + token },
      });
      if (userData.success) {
        // dispatch(setAuth({ token, user: userData?.data }));
        dispatch(setAuth({ token, user: { ...userData?.data, role: "admin" } }));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div className="body flex">
      <div className="flex flex-col justify-center w-[240px] bg-white/5 m-0 h-screen overflow-y-scroll">
        <MobileNav />
      </div>
      <div className="main_part h-screen  overflow-y-scroll p-5 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

// <body className=" body *:p-[15px] *:m-0 *:box-border h-full  flex flex-col">
//   {/* <Header></Header> */}
//   <div className=" grid grid-cols-5">
//     <div className=" col-span-1">
//       <div>
//         <MobileNav/>
//       </div>
//     </div>
//     <div className=" col-span-4">
//       <Outlet />
//     </div>
//   </div>
// </body>

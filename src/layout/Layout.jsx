import { Outlet } from "react-router-dom";
import MobileNav from "./MobileNav";

// eslint-disable-next-line react/prop-types
const Layout = () => {
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

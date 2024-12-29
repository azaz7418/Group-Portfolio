import { AiOutlineTeam } from "react-icons/ai";
import { CgToolbox } from "react-icons/cg";
import { GoPersonFill } from "react-icons/go";
import { ImBlog } from "react-icons/im";
import { LuMessagesSquare } from "react-icons/lu";
import { TiHome } from "react-icons/ti";

// components
import Home from "../pages/Home.jsx";
import Services from "../pages/services/Services.jsx";
import Work from "../pages/work/Work.jsx";
import Contact from "../pages/contact/Contact.jsx";
// import Blogs from "../pages/blogs/Blogs.jsx";
import Team from "../pages/team/Team.jsx";
import Login from "../pages/login/Login.jsx";
import Registration from "../pages/registration/Registration.jsx";
// import Admin from "../pages/Admin/Admin.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userRole } from "../constants/userConstant.js";
import AllUser from "../pages/User/AllUser.jsx";

export const UserNav = [
  {
    name: "home",
    path: "/",
    icon: <TiHome />,
    component: <Home />,
    isShow: true,
  },
  {
    name: "services",
    path: "/services",
    icon: <ImBlog />,
    component: <Services />,
    isShow: true,
  },
  {
    name: "works",
    path: "/work",
    icon: <CgToolbox />,
    component: <Work />,
    isShow: true,
  },
  // {
  //   name: "blogs",
  //   path: "/blogs",
  //   icon: <ImBlog />,
  //   component:<Blogs/>,
  //   isShow:true
  // },
  {
    name: "team",
    path: "/team",
    icon: <AiOutlineTeam />,
    component: <Team />,
    isShow: true,
  },

  {
    name: "about us",
    path: "/resume",
    icon: <GoPersonFill />,
    //   component:,
    //   isShow:true
  },
  {
    name: "contact",
    path: "/contact",
    icon: <LuMessagesSquare />,
    component: <Contact />,
    isShow: true,
  },
  {
    name: "login",
    path: "/auth/group/login",
    icon: <LuMessagesSquare />,
    component: <Login />,
    isShow:true
  },
  {
    name: "registration",
    path: "/auth/group/registration",
    icon: <LuMessagesSquare />,
    component: <Registration />,
    isShow:true
  },
  {
    name: "Users",
    path: "/admin/users",
    component: <AllUser/>,
    isShow: true,
  },
  // {
  //   name: "admin",
  //   path: "/admin",
  //   icon: <LuMessagesSquare />,
  //   component: <Admin />,
  //   isShow:true
  // },
];

export const AdminNav = [
  
  {
    name: "Edit Users",
    path: "/admin/users/edit/:id",
    component: "",
    isShow: false,
  },
];

const useNavHelper = () => {
  const { user } = useSelector((state) => state.auth);
  const [NavOptions, setNavOptions] = useState(UserNav);

  // console.log({ user, role: user.role === userRole.ADMIN, admin:userRole.ADMIN });

  useEffect(() => {
    if (user?.role === userRole.ADMIN) {
      setNavOptions([...UserNav, ...AdminNav]);
    } else {
      setNavOptions(UserNav);
    }
  }, [user, user.role]);

  return NavOptions;
};

export default useNavHelper;

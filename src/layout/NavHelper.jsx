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

export const NavHelper = [
  {
    name: "home",
    path: "/",
    icon: <TiHome />,
    component: <Home />,
  },
  {
    name: "services",
    path: "/services",
    icon: <ImBlog />,
    component: <Services />,
  },
  {
    name: "works",
    path: "/work",
    icon: <CgToolbox />,
    component:<Work/>
  },
  // {
  //   name: "blogs",
  //   path: "/blogs",
  //   icon: <ImBlog />,
  //   component:<Blogs/>,
  // },
  {
    name: "team",
    path: "/team",
    icon: <AiOutlineTeam />,
    component:<Team/>,
  },

  {
    name: "about us",
    path: "/resume",
    icon: <GoPersonFill />,
    //   component:,
  },
  {
    name: "contact",
    path: "/contact",
    icon: <LuMessagesSquare />,
      component:<Contact/>,
  },
];




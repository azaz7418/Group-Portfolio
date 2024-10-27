import {  NavLink } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "services",
    path: "/services",
  },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "work",
    path: "/work",
  },
  {
    name: "contact",
    path: "/contact",
  },
];
const Nav = () => {
  return (
    <nav className="flex gap-8">

{/* <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, transition: { delay: 1, duration: 0.4, ease: "easeInOut" } }}
         
          className="h-screen w-screen fixed bg-primary top-0 pointer-events-none"
          />
          
      </AnimatePresence> */}
      {links.map((link ) => {
        return (
          
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive,  }) => {
              return isActive ? " text-accent border-b-2 border-accent capitalize" : "  capitalize font-medium hover:text-accent transition-all";
            }}
          >
            {link.name}
          </NavLink>
        );
      })}

      
    </nav>
  );
};

export default Nav;

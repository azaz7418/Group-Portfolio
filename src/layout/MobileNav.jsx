import { NavLink } from "react-router-dom";

import { NavHelper } from "./NavHelper";

const MobileNav = () => {
  return (
    <nav className="  ">
      {/* menu */}
      <div className="px-10">
        {NavHelper?.map((link, index) => {
          return (
            <div key={index} className="flex items-center gap-x-3 group">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  ` capitalize font-medium my-3 flex items-center gap-x-3 hover:text-accent transition-all ${
                    isActive && "text-accent"
                  }`
                }
              >
                <div>{link.icon}</div>
                <div>{link.name}</div>
              </NavLink>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;

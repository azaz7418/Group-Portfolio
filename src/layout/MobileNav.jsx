import { NavLink } from "react-router-dom";
import useNavHelper from "./NavHelper";

// import { UserNav } from "./NavHelper";

const MobileNav = () => {
  const UserNav = useNavHelper();

  // console.log({UserNav})

  return (
    <nav className="  ">
      {/* menu */}
      <div className="px-10">
        {Array.isArray(UserNav) &&
          UserNav?.filter((item) => item.isShow)?.map((link, index) => {
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

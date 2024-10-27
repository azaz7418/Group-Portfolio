import { FiGithub, FiLinkedin, FiTwitter, FiYoutube } from "react-icons/fi";
import { Link } from "react-router-dom";

const socials = [
  {
    icon: <FiGithub />,
    path: "",
  },
  {
    icon: <FiLinkedin />,
    path: "",
  },
  {
    icon: <FiYoutube />,
    path: "",
  },
  {
    icon: <FiTwitter />,
    path: "",
  },
];
const Social = () => {
  return (
    <div className=" flex gap-6 ">
      {socials.map((item) => {
        return (
          <div key={item.id} className="  ">
            <Link to={item.path} className=" w-9 p-2 border border-accent rounded-full  font-extrabold flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500">
              {item.icon}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Social;

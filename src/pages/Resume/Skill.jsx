import { Tooltip } from "antd";
import { FaCss3, FaFigma, FaHtml5, FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";

const skills = {
  title: "My Skills",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolore iusto voluptates tempora.",
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "Html 5",
    },
    {
      icon: <FaCss3 />,
      name: "Css 3",
    },
    {
      icon: <FaJs />,
      name: "Javascript",
    },
    {
      icon: <FaReact />,
      name: "React.js",
    },
    {
      icon: <FaReact />,
      name: "React.js",
    },
    {
      icon: <SiTailwindcss />,
      name: "Tailwind.css",
    },
    {
      icon: <FaNodeJs />,
      name: "Node.js",
    },
    {
      icon: <FaFigma />,
      name: "Figma",
    },
  ],
};

const Skill = () => {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col gap-[30px] text-center md:text-left">
          <h3 className="text-4xl font-bold">{skills.title}</h3>
          <p className=" max-w-[600px] text-white/60 mx-auto md:mx-0">{skills.description}</p>
        </div>
        <ul className="grid grid-cols-2 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-4 md:gap-[30px] ">
          {skills.skillList.map((item, index) => {
            return (
              <li key={index}>
                <div className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                  <Tooltip
                    title={item.name}
                    overlayInnerStyle={{ backgroundColor: "white", fontWeight: "bold", color: "black" }}
                  >
                    <div className=" text-6xl group-hover:text-accent transition-all duration-300">{item.icon}</div>
                  </Tooltip>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Skill;

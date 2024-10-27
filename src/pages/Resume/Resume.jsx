import { FaCss3, FaFigma, FaHtml5, FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import { motion } from "framer-motion";

import { SiTailwindcss } from "react-icons/si";
import { Tabs } from "antd";
import { useState } from "react";
import Skill from "./Skill";
import About from "./About";

const { TabPane } = Tabs;
// about data


// experience data
const experience = {
  icon: "/assets/resume/badge.svg",
  title: "My Experience",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolore iusto voluptates tempora.",
  items: [
    {
      company: "company Name",
      position: "Position Name",
      duration: "Start - End year",
    },
    {
      company: "company Name",
      position: "Position Name",
      duration: "Start - End year",
    },
    {
      company: "company Name",
      position: "Position Name",
      duration: "Start - End year",
    },
    {
      company: "company Name",
      position: "Position Name",
      duration: "Start - End year",
    },
    {
      company: "company Name",
      position: "Position Name",
      duration: "Start - End year",
    },
    {
      company: "company Name",
      position: "Position Name",
      duration: "Start - End year",
    },
  ],
};

// education data
const education = {
  icon: "/assets/resume/cap.svg",
  title: "My Education",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolore iusto voluptates tempora.",
  items: [
    {
      Institution: "Programming Hero",
      degree: "Front-end Web Development",
      duration: "2023",
    },
    {
      Institution: "Programming Hero",
      degree: "Front-end Web Development",
      duration: "2023",
    },
    {
      Institution: "Programming Hero",
      degree: "Front-end Web Development",
      duration: "2023",
    },
    {
      Institution: "Programming Hero",
      degree: "Front-end Web Development",
      duration: "2023",
    },
    {
      Institution: "Programming Hero",
      degree: "Front-end Web Development",
      duration: "2023",
    },
    {
      Institution: "Programming Hero",
      degree: "Front-end Web Development",
      duration: "2023",
    },
  ],
};


const tabs = [
  { key: "1", label: "Experience", content: "Your experience details go here..." },
  { key: "2", label: "Education", content: "Your education details go here..." },
  { key: "3", label: "Skills", content: "Your skills details go here..." },
  { key: "4", label: "About Me", content: "Details about you go here..." },
];

const Resume = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 1, duration: 0.4, ease: "easeIn" } }}
      className="min-h-[80vh] flex items-center justify-center py-12 md:py-0"
      //   exit={{ opacity: 0 }}
    >
      <div className="container mx-auto">
        <div className="">
          <div className=" flex flex-col md:flex-row gap-[60px]">
            <div className="flex flex-col w-full max-w-[380px] mx-auto md:mx-0 gap-6">
              {tabs.map((tab) => (
                <div
                  key={tab.key}
                  className={` inline-flex w-full bg-[#27272c] h-auto items-center justify-center whitespace-nowrap  rounded-lg p-3 text-balance font-medium ring-offset-white transition-all disabled:pointer-events-none disabled:opacity-50  ${
                    activeTab === tab.key ? "bg-accent text-primary font-bold shadow-sm" : "text-white"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </div>
              ))}
            </div>
            <div className="min-h-[70vh] w-full">
              {tabs.map(
                (tab) =>
                  tab.key === activeTab && (
                    <div className="w-full" key={tab.key}>
                      {tab.label === "Experience" ? (
                        <div className=" flex flex-col gap-[30px] text-center md:text-left">
                          <h2 className="text-4xl font-bold">{experience.title}</h2>
                          <p className="max-w-[600px] text-white/60 mx-auto md:mx-0">{experience.description}</p>
                          <div className="h-[300px] overflow-scroll">
                            <ul className=" grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                              {experience.items.map((item, index) => {
                                return (
                                  <li
                                    key={index}
                                    className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center md:items-start gap-1"
                                  >
                                    <span className="text-accent">{item.duration}</span>
                                    <h3 className="text-xl max-w-[260px] min-h-[60px] text-clip md:text-left">
                                      {item.position}
                                    </h3>
                                    <div className=" flex items-center gap-3">
                                      {/* dot */}
                                      <span className=" w-[6px] h-[6px] rounded-full bg-accent"></span>
                                      <p className="text-white/60">{item.company}</p>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {tab.label === "Education" ? (
                        <div className=" flex flex-col gap-[30px] text-center md:text-left">
                          <h2 className="text-4xl font-bold">{education.title}</h2>
                          <p className="max-w-[600px] text-white/60 mx-auto md:mx-0">{education.description}</p>
                          <div className="h-[300px] overflow-scroll">
                            <ul className=" grid grid-cols-1 md:grid-cols-2 gap-[25px]">
                              {education.items.map((item, index) => {
                                return (
                                  <li
                                    key={index}
                                    className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center md:items-start gap-1"
                                  >
                                    <span className="text-accent">{item.duration}</span>
                                    <h3 className="text-xl max-w-[260px] min-h-[60px] text-clip md:text-left">
                                      {item.degree}
                                    </h3>
                                    <div className=" flex items-center gap-3">
                                      {/* dot */}
                                      <span className=" w-[6px] h-[6px] rounded-full bg-accent"></span>
                                      <p className="text-white/60">{item.Institution}</p>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {tab.label === "Skills" ? <Skill /> : ""}
                      {tab.label === "About Me" ? <About /> : ""}

                      {/* <h2 className="text-xl font-bold mb-2">{tab.label}</h2>
                      <p>{tab.content}</p> */}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Resume;

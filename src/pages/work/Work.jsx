import { useState } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "antd";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper styles
import "swiper/css";
import WorkSliderButton from "./WorkSliderButton";
import { projects } from "./ProjectList";

const Work = () => {
  const [project, setProject] = useState(projects[0]);

  const hnadleSlideChange = (swiper) => {
    // current slide index
    const currentIndex = swiper.activeIndex;
    // update project state based on current slide index
    setProject(projects[currentIndex]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 1, duration: 0.4, ease: "easeIn" } }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0 md:px-0"
    >
      <div className="container mx-auto">
        <div className=" flex flex-col xl:flex-row md:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50% ] xl:h-[460px] md:w-[50% ] md:h-[460px]  flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* outline num */}
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">{project.num}</div>
              {/* project category */}
              <h2 className=" text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.category} project
              </h2>
              {/* project description */}
              <p className=" text-white/60">{project.description}</p>
              {/* stack */}
              <ul className="flex gap-4">
                {project.stack.map((item, index) => {
                  return (
                    <li key={index} className=" text-xl text-accent">
                      {item.name}
                      {/* remove the last comma */}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>
              {/* border */}
              <div className=" border border-white/20"></div>
              {/* button */}
              <div className="flex items-center gap-4">
                <Tooltip
                  title="Live Project"
                  mouseEnterDelay={0.3}
                  overlayInnerStyle={{ backgroundColor: "white", fontWeight: "bold", color: "black" }}
                >
                  <Link to={project.live}>
                    <div className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                      <BsArrowUpRight className=" text-white text-3xl group-hover:text-accent" />
                    </div>
                  </Link>
                </Tooltip>
                {/* github project button */}
                <Tooltip
                  title="Github Repository"
                  mouseEnterDelay={0.3}
                  overlayInnerStyle={{ backgroundColor: "white", fontWeight: "bold", color: "black" }}
                >
                  <Link to={project.gitHub}>
                    <div className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                      <BsGithub className=" text-white text-3xl group-hover:text-accent" />
                    </div>
                  </Link>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[50%] xl:w-[50% ]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={hnadleSlideChange}
            >
              {projects.map((item, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      {/* overly */}
                      <div className=" absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      {/* image */}
                      <div className="relative h-full w-full">
                        <img src={project.image} alt="" className=" h-full w-full object-cover" />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* slider buttons */}
              <WorkSliderButton containerStyles=" flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] z-20 xl:bottom-0 md:bottom-0 w-full justify-between xl:w-max md:w-max xl:justify-none md:justify-none" btnStyles=" bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all "/>

            </Swiper>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Work;

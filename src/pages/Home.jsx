/* eslint-disable react/no-unescaped-entities */
import { FiDownload } from "react-icons/fi";
import Social from "./Social";
import Image from "./Image";
import States from "../components/States";
import { ReactTyped } from "react-typed";

const Home = () => {
  return (
    <section>
      <div className=" mx-auto">
        <div className="flex flex-col xl:flex-row md:flex-row justify-between items-center md:pt-8 md:pb-24 xl:pt-8 xl:pb-24">
          {/* text */}

          <div className=" text-center xl:text-left md:text-left order-2 md:order-none xl:order-none">
            <div className="text-emerald-500 tracking-[5px] font-bold">
              <ReactTyped strings={["Hello world"]} typeSpeed={40} backSpeed={50} cursorChar="_" loop />
            </div>
            <h1 className="h1 mb-6">
              Welcome to <br />
              <span className=" text-accent">
                Hike<span className="text-amber-300">IT</span>
              </span>
            </h1>
            <p className=" max-w-[500px] mb-9 text-white/80">
              I excel at crafting elegant digital experiences and I am proficient in various programming languages and
              technologies.
            </p>
            {/* Button and Social */}
            <div className=" flex flex-col md:flex-row xl:flex-row items-center gap-8">
              <button className=" button outline-0 hover:text-primary bg-transparent border border-solid border-spacing-1 border-accent text-accent uppercase flex gap-2">
                <span className="">Download CV</span>
                <FiDownload className=" text-xl" />
              </button>
              <div className=" mb-8 xl:mb-0 md:mb-0">
                <Social />
              </div>
            </div>
          </div>

          {/* photo */}
          <div className=" order-1 md:order-none xl:order-none mb-8 xl:mb-0">
            <Image />
          </div>
        </div>
      </div>
      <States />
    </section>
  );
};

export default Home;

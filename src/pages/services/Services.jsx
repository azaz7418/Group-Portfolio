import { BsArrowDownRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const services = [
  {
    num: "01",
    title: "Web Development",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque libero.",
    href: "",
  },
  {
    num: "02",
    title: "Web Design",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque libero.",
    href: "",
  },
  {
    num: "03",
    title: "Digital Marketing",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque libero.",
    href: "",
  },
  {
    num: "04",
    title: "SEO",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque libero.",
    href: "",
  },
];

const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0 md:py-0">
      <div className=" container mx-auto">
        <div className=" mb-6 text-3xl font-semibold text-accent">
          Services
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-[40px] mt-4">
          {services.map((service, index) => {
            return (
              <div key={index} className="  flex flex-col justify-center items-center text-center gap-3 group bg-white/15 p-4 rounded">
                {/* top */}
                <div className=" text-center">
                  {/* <div className=" text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                    {service.num}
                  </div> */}
                  <Link
                    to={service.href}
                    className=" w-[60px] h-[60px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"
                  >
                    <BsArrowDownRight className=" text-primary text-3xl" />
                  </Link>
                </div>
                {/* title */}
                <h2 className="text-[28px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
                  {service.title}
                </h2>
                {/* description */}
                <p className=" text-white/60">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

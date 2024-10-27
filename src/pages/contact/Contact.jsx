/* eslint-disable react/no-unescaped-entities */
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: <a href="tel:+8801922 880106">(+88) 01922 880106</a>,
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: <a href="mailto:azazahamed7418@gmail.com">azazahamed7418@gmail.com</a>,
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    description: "Sathalia, Koyra, Khulna",
  },
];

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 1, duration: 0.4, ease: "easeInOut" } }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row md:flex-row gap-[30px]">
          {/* form */}
          <div className="xl:w-[54%] md:w-[54%] order-2 md:order-none xl:order-none">
            <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <h2 className="text-4xl text-accent">Let's work together</h2>
              <p className=" text-white/60">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat aliquam hic sapiente magni sed.
              </p>
              {/* input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full name"
                  className="flex h-[48px] rounded-md border-white/10  font-light bg-primary px-4 py-5 text-base placeholder:text-white/60 outline-none focus:border focus:border-accent"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex h-[48px] rounded-md border-white/10  font-light bg-primary px-4 py-5 text-base placeholder:text-white/60 outline-none focus:border focus:border-accent"
                />
              </div>
              {/* select */}

              <textarea
                name="message"
                id=""
                placeholder="Type your message here"
                className=" h-[140px] flex min-h-[80px] w-full rounded-md border border-white/10 bg-primary px-4 py-5 text-base placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button className="button max-w-40">Send message</button>
            </form>
          </div>
          {/* info */}
          <div className="flex-1  flex items-center xl:justify-end md:justify-end order-1 xl:order-none md:order-none mb-8 xl:mb-0 md:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-6">
                    <div className="w-[52px] h-[52px] xl:w-[72px] md:w-[72px] xl:h-[72px] md:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className=" flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="text-xl">{item.description}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default Contact;

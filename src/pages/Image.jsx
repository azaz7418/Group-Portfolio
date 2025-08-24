import {  motion } from "framer-motion";

const Image = () => {
    return (
        <div className=" w-full h-full relative">
            <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1, duration: 0.4, ease: "easeIn" } }}
            >
                <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1.4, duration: 0.4, ease: "easeInOut" } }}
                className=" w-[298px] h-[298px] xl:w-[448px] md:w-[448px] xl:h-[448px] md:h-[448px] mix-blend-lighten absolute ">
                    <img 
                    src="/image/photo.png" 
                    alt="Azaz Ahamed" 
                    className=" object-contain  " />
                </motion.div>
                {/* circle */}

                <motion.svg  
                className=" w-[300px] xl:w-[466px] md:w-[466px] h-[300px] xl:h-[466px] md:h-[466px]" 
                fill=" transparent"
                viewBox="0 0 506 506"
                xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.circle
                    cx="253"
                    cy="253"
                    r="250"
                    stroke="#5E81AC"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{strokeDasharray:"24 10 0 0"}}
                    animate={{
                        strokeDasharray:["15 120 25 25","16 25 92 72","4 250 22 22"],
                        rotate:[120, 360]
                    }}
                    transition={{
                        duration:20,
                        repeat:Infinity,
                        repeatType:"reverse"
                    }}
                    />
                </motion.svg>
            </motion.div>
            
        </div>
    );
};

export default Image;
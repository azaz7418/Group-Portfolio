import CountUp from "react-countup";

const states = [
  {
    num: 1,
    text: "Years of experience",
  },
  {
    num: 3,
    text: "Projects Completed",
  },
  {
    num: 7,
    text: "Technologies Mastered",
  },
  {
    num: 200,
    text: "Code Commits",
  },
];

const States = () => {
  return (
    <section className="pt-4 pb-12 md:pt-0 md:pb-0 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none md:max-w-none">
          {states.map((item, index) => {
            return (
              <div
                key={index}
                className=" flex-1 flex gap-4 items-center justify-center xl:justify-start md:justify-start"
              >
                <CountUp
                  end={item.num}
                  duration={5}
                  delay={2}
                  className="text-4xl md:text-6xl xl:text-6xl font-extrabold"
                />
                <p
                  className={`${
                    item.text.length < 15 ? "max-w-[100px]" : " max-w-[150px]"
                  }  text-white/80 `}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default States;

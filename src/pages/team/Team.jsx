// const team = [
//   {
//     name: "azaz ahamed",
//     image:
//       "https://img.freepik.com/free-photo/surprised-handsome-man-showing-banner-pointing-up_176420-18869.jpg?w=826&t=st=1726065625~exp=1726066225~hmac=25b99f94eb9970f25faeb231660e587d365738088b811d428004bc6aaaeb9245",
//     role: "Front-end Designer, back-end developer",
//     link: "https://azaz7418.netlify.app",
//   },
//   {
//     name: "suronjit paul",
//     image:
//       "https://img.freepik.com/free-photo/surprised-handsome-man-showing-banner-pointing-up_176420-18869.jpg?w=826&t=st=1726065625~exp=1726066225~hmac=25b99f94eb9970f25faeb231660e587d365738088b811d428004bc6aaaeb9245",
//     role: "web Designer, back-end developer",
//     link: "https://azaz7418.netlify.app",
//   },
//   {
//     name: "abu-bakar siddik",
//     image:
//       "https://img.freepik.com/free-photo/surprised-handsome-man-showing-banner-pointing-up_176420-18869.jpg?w=826&t=st=1726065625~exp=1726066225~hmac=25b99f94eb9970f25faeb231660e587d365738088b811d428004bc6aaaeb9245",
//     role: "logo designer, back-end developer",
//     link: "https://azaz7418.netlify.app",
//   },
//   {
//     name: "azaz ahamed",
//     image:
//       "https://img.freepik.com/free-photo/surprised-handsome-man-showing-banner-pointing-up_176420-18869.jpg?w=826&t=st=1726065625~exp=1726066225~hmac=25b99f94eb9970f25faeb231660e587d365738088b811d428004bc6aaaeb9245",
//     role: "Front-end Designer, back-end developer",
//     link: "https://azaz7418.netlify.app",
//   },
//   {
//     name: "azaz ahamed",
//     image:
//       "https://img.freepik.com/free-photo/surprised-handsome-man-showing-banner-pointing-up_176420-18869.jpg?w=826&t=st=1726065625~exp=1726066225~hmac=25b99f94eb9970f25faeb231660e587d365738088b811d428004bc6aaaeb9245",
//     role: "Front-end Designer, back-end developer",
//     link: "https://azaz7418.netlify.app",
//   },
//   {
//     name: "azaz ahamed",
//     image:
//       "https://img.freepik.com/free-photo/surprised-handsome-man-showing-banner-pointing-up_176420-18869.jpg?w=826&t=st=1726065625~exp=1726066225~hmac=25b99f94eb9970f25faeb231660e587d365738088b811d428004bc6aaaeb9245",
//     role: "Front-end Designer, back-end developer",
//     link: "https://azaz7418.netlify.app",
//   },

import { team } from "./TeamList";

// ];
const Team = () => {
  return (
    <div>
      <div className=" mb-10 text-3xl font-semibold text-accent">Team Member</div>
      <div className=" grid grid-cols-4 gap-4">
        {Array.isArray(team) &&
          team?.map((item, index) => {
            return (
              <a target="_blank" key={index} href={item?.link}>
                <div key={index} className="max-w-sm mx-auto bg-white/15 shadow-lg rounded-lg overflow-hidden group">
                  <div className=" overflow-hidden">
                    <img
                      className="w-full  brightness-90 group-hover:brightness-100 transition-transform duration-300 transform scale-100 group-hover:scale-110 h-48 object-cover"
                      src={item?.image}
                      alt={item?.name}
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-accent capitalize">{item?.name}</h2>
                    <p className="mt-2 text-white/60 capitalize">{item?.role}</p>
                  </div>
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default Team;


import { useQuery } from "react-query";
import { createUser } from "../../constants/userConstant";


const Team = () => {
  const { data: userData } = useQuery({
    queryKey: ["createUser"],
    queryFn: createUser,
  });
console.log(userData)

  return (
    <div>
      <div className=" mb-10 text-3xl font-semibold text-accent">Team Member</div>
      <div className=" grid grid-cols-4 gap-4">
        {userData?.data?.map((item, index) => {
          return (
            <a target="_blank" key={index} href={item?.link}>
              <div
                key={index}
                className="max-w-sm mx-auto bg-white/15 h-full shadow-lg rounded-lg overflow-hidden group"
              >
                <div className=" overflow-hidden">
                  <img
                    className="w-full  brightness-90 group-hover:brightness-100 transition-transform duration-300 transform scale-100 group-hover:scale-110 h-48 object-cover"
                    src={item?.image}
                    alt={item?.name}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-accent capitalize">{item?.name}</h2>
                  <p className="mt-2 text-white/60 capitalize">{item?.designation}</p>
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

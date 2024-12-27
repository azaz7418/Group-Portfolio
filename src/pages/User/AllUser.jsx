import axios from "axios";
import { baseURL } from "../../main";
import { useQuery } from "react-query";

const createUser = async (body) => {
  const { data } = await axios.get(`${baseURL}/teams`, body);
  return data;}
const AllUser = () => {

  const {data} = useQuery({
    queryKey:["createUser"],
    queryFn: createUser
  })
  // console.log(data.data)
  return (
    <div className=" grid grid-cols-1 p-2 gap-3">
      {
        data?.data?.map((item, index)=>{
          return(
            <div key={index} className=" text-white bg-slate-500 p-3">
              <div>
                <img src={item.image} alt={item.name} />
              </div>
            </div>
          )
        })
      }
      
    </div>
  );
};

export default AllUser;
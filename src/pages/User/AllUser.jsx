import axios from "axios";
import { baseURL } from "../../main";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteUser } from "../../constants/userConstant";
import { MdDeleteOutline } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

const createUser = async (body) => {
  const { data } = await axios.get(`${baseURL}/teams`, body);
  return data;
};

const AllUser = () => {
  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ["createUser"],
    queryFn: createUser,
  });

  const { mutate, error: deleteError } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: deleteUser,
    onSuccess: () => {
      // Invalidate the query on success to refresh data
      queryClient.invalidateQueries({ queryKey: ["createUser"] });
    },
  });
  if (deleteError) {
    return <div>error happen</div>;
  }
  const deleteHandler = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id);
      }
    });
  };

  return (
    <div className=" grid grid-cols-1 p-2 gap-3">
      <Link to="/createUser">Create user</Link>
      {userData?.data?.map((item, index) => {
        return (
          <div key={index} className=" bg-accent-hover text-primary p-2 rounded">
            <div className=" flex items-center justify-between">
              <div className=" flex items-center">
                <img className="w-9 h-9 mx-2 border-2 border-primary rounded-full" src={item.image} alt={item.name} />
                <div className="flex flex-col items-start justify-start leading-3 ml-2">
                  <h1 className=" font-bold">{item.name}</h1>
                  <h3 className=" text-xs text-slate-800">{item.designation}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl text-primary font-semibold" onClick={() => deleteHandler(item._id)}>
                  <FaUserEdit />
                </h1>
                <h1 className="text-2xl text-primary font-semibold" onClick={() => deleteHandler(item._id)}>
                  <MdDeleteOutline />
                </h1>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllUser;

import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { createUser, deleteUser } from "../../constants/userConstant";
import { MdDeleteOutline } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { useState } from "react";
// import { Button, Form, Input, Modal, Space } from "antd";
// import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import UpdateUser from "./UpdateUser";



const AllUser = () => {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editData, setEditData] = useState();

  const { data: userData } = useQuery({
    queryKey: ["createUser"],
    queryFn: createUser,
  });

  const { mutate: deleteUsers, error: deleteError } = useMutation({
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
        deleteUsers(id);
      }
    });
  };

  const editHandler = (user) => {
    setEditingUser(user); // Opens the modal/form prefilled with user data
    setIsModalOpen(true);
    console.log(editingUser);
  };

  return (
    <div className=" grid grid-cols-1 p-2 gap-3">
      <Link to="/createUser">Create user</Link>
      {userData?.data?.map((item, index) => {
        return (
          <div key={index} className=" bg-[#27272c] text-primary p-2 rounded">
            <div className=" flex items-center justify-between">
              <div className=" flex items-center">
                <img className="w-9 h-9 mx-2 border-2 border-primary rounded-full" src={item.image} alt={item.name} />
                <div className="flex flex-col items-start justify-start leading-3 ml-2">
                  <h1 className=" font-bold text-accent">{item.name}</h1>
                  <h3 className=" text-xs text-white">{item.designation}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl text-accent-hover font-semibold" onClick={() => editHandler(item)}>
                  <FaUserEdit />
                </h1>
                <h1 className="text-2xl text-accent-hover font-semibold" onClick={() => deleteHandler(item._id)}>
                  <MdDeleteOutline />
                </h1>
              </div>
            </div>
          </div>
        );
      })}

      {isModalOpen && <UpdateUser isModalOpen={isModalOpen} editData={editingUser} setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default AllUser;

import axios from "axios";
import { baseURL } from "../../main";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteUser } from "../../constants/userConstant";
import { MdDeleteOutline } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { useState } from "react";
// import { Button, Form, Input, Modal, Space } from "antd";
// import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import UpdateUser from "./UpdateUser";

const createUser = async (body) => {
  const { data } = await axios.get(`${baseURL}/teams`, body);
  return data;
};

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
console.log(editingUser)
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
                <h1 className="text-2xl text-primary font-semibold" onClick={()=>editHandler(item)}>
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


  {isModalOpen && (
    <UpdateUser
      isModalOpen={isModalOpen}
      editData={editingUser}
      setIsModalOpen={setIsModalOpen}
    />
  )}

      {/* {editingUser && (
        <Modal title="Preview" open={isModalOpen} onOk={handleOk} onCancel={handleClose} centered>
          <div className="modal">
            <Form
              layout="vertical"
              initialValues={{
                name: editingUser.name,
                designation: editingUser.designation,
                description: editingUser.description,
                social: editingUser.social,
                image: [editingUser.image],
              }}
              onFinish={(values) => {
                const body = {
                  name: values.name,
                  designation: values.designation,
                  description: values.description,
                  image: values.image?.[0]?.response?.url || editingUser.image,
                  social: values.social,
                };
                updateUsers({ id: editingUser._id, body });
                setEditingUser(null); // Close modal after submission
              }}
            >
              <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required!" }]}>
                <Input placeholder="Enter name" />
              </Form.Item>
              <Form.Item
                name="designation"
                label="Designation"
                rules={[{ required: true, message: "Designation is required!" }]}
              >
                <Input placeholder="Enter designation" />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input.TextArea placeholder="Enter description" />
              </Form.Item>
              <Form.List name="social">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} align="baseline" style={{ marginBottom: 8 }}>
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          rules={[{ required: true, message: "Social name is required!" }]}
                        >
                          <Input placeholder="Social name (e.g., Facebook)" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "link"]}
                          rules={[
                            { required: true, message: "Link is required!" },
                            { type: "url", message: "Enter a valid URL!" },
                          ]}
                        >
                          <Input placeholder="Link (e.g., https://facebook.com)" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} style={{ color: "red" }} />
                      </Space>
                    ))}
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                      Add Social Link
                    </Button>
                  </>
                )}
              </Form.List>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      )} */}
    </div>
  );
};

export default AllUser;

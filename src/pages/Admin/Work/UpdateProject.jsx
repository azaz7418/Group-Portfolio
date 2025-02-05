import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { updateProject, getAllUser } from "../../../constants/userConstant";
import Swal from "sweetalert2";

const { TextArea } = Input;
const { Option } = Select;

const UpdateProject = ({ isModalOpen, editData, setIsModalOpen }) => {
  const { title, description, category, users } = editData;
  
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // Fetch Users
   const { data: userData } = useQuery({
      queryKey: ["createUser"],
      queryFn: getAllUser,
    });

  const { mutate: update_Project } = useMutation(updateProject, {
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
      Swal.fire({
        title: "Updated!",
        text: "Project information has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setIsModalOpen(false);
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to update project.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log({ id: editData._id, body: values });
      
      update_Project({ id: editData._id, body: values });
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  return (
    <Modal
      title="Update Project"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: title ,
          description: description ,
          category: category,
          users: users,
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <TextArea rows={4} placeholder="Enter description" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select category">
            <Option value="Design">Design</Option>
            <Option value="Development">Development</Option>
            <Option value="Marketing">Marketing</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Contributors"
          name="users"
          rules={[{ required: true, message: "Please add at least one contributor!" }]}
        >
          <Select mode="tags" placeholder="Add Contributor">
            {userData?.data?.map((item) => (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* <Form.Item
          label="Image"
          name="image"
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <Upload
            name="image"
            listType="picture"
            beforeUpload={() => false} // Prevent automatic upload
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default UpdateProject;

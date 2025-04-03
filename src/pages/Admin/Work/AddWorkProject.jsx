import { Form, Input, Button, Select } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import { addWork, getAllUser } from "../../../constants/userConstant";
import UploadImage from "../../../components/UploadImage";

const { TextArea } = Input;
const { Option } = Select;

const AddWorkProject = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ["createUser"],
    queryFn: getAllUser,
  });
  // console.log(userData);

  const { mutate } = useMutation({
    mutationFn: addWork,
    onSuccess: async (data) => {
      await Swal.fire({
        title: "Success!",
        text: data?.message || "Work has been successfully added.",
        icon: "success",
        confirmButtonText: "OK",
      });
      form.resetFields();
      navigate("/addWork"); // Redirect to works page
    },
    onError: async (error) => {
      await Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const onFinish = (values) => {
    const { title, description, category, image, users } = values;
    console.log("azaz", values);

    const body = {
      title,
      description,
      category,
      image: image?.[0].url,
      users,
    };
    console.log("body", body);
    mutate(body);
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <h2 className="mb-10 text-3xl font-semibold text-accent">Add Project Information</h2>
      <div className="w-1/2">
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ category: "Design" }}>
          <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input the title!" }]}>
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
            rules={[{ required: true, message: "Please input at least one Contributor!" }]}
          >
            <Select mode="tags" placeholder="Add Contributor" tokenSeparators={[","]}>
              {userData?.data?.map((item, index) => {
                return (
                  <Option key={index} value={item._id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <UploadImage
            {...{
              label: "Profile Picture",
              listType: "picture",
              maxCount: 1,
              name: "image",
              isLoading,
              setIsLoading,
              form,
            }}
          />

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddWorkProject;

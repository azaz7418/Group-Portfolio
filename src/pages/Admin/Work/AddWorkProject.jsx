import { Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import { addWork, getAllUser } from "../../../constants/userConstant";

const { TextArea } = Input;
const { Option } = Select;

const AddWorkProject = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);

  const { data: userData } = useQuery({
    queryKey: ["createUser"],
    queryFn: getAllUser,
  });
  console.log(userData);

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
      setImageFile(null); // Reset file state
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

  const handleFileChange = (info) => {
    const file = info.file.originFileObj;
    setImageFile(file);
    message.success(`${info.file.name} file selected successfully.`);
  };

  const onFinish = (values) => {
    const { title, description, category, image, users } = values;
    const body = {
      title,
      description,
      category,
      image:
        image?.[0]?.response?.url ||
        "https://img.freepik.com/free-vector/flat-design-web-designer-landing-page_23-2150333314.jpg?t=st=1738329696~exp=1738333296~hmac=ba4d9043531ea1ae6bb81190ce976f303cc22fdc09ea682723777fa1904f6def&w=900",
      users,
    };
    console.log(body);
    mutate(body);
    // const formData = new FormData();
    // formData.append("title", values.title);
    // formData.append("description", values.description);
    // formData.append("category", values.category);
    // formData.append("users", JSON.stringify(values.users));
    // if (imageFile) {
    //   formData.append("image", imageFile);
    // } else {
    //   message.error("Please upload an image!");
    //   return;
    // }

    // mutate(formData); // Trigger react-query mutation
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

          <Form.Item label="Image" rules={[{ required: true, message: "Please upload an image!" }]}>
            <Upload
              name="image"
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

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

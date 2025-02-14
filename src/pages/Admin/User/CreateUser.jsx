import {
  // LockOutlined,
  // MailOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
  // UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Space, Upload } from "antd";
import axios from "axios";
import { useMutation } from "react-query";
// import { Link } from "react-router-dom";
import { baseURL } from "../../../main";
import Swal from "sweetalert2";
import UploadImage from "../../../components/UploadImage";
import { useState } from "react";

const createUser = async (body) => {
  const { data } = await axios.post(`${baseURL}/teams`, body);
  return data;
};

// const customUpload = ({ file, onSuccess, onError }) => {
//   const formData = new FormData();
//   formData.append("photos", file);

//   axios
//     .post("/upload", formData)
//     .then((response) => {
//       // onSuccess(response.data, file);]
//       if (response.data) {
//         console.log("success", response);
//         onSuccess(response.data, file);
//       } else {
//         throw new Error("No response data");
//       }
//     })
//     .catch((error) => {
//       console.error("Upload failed:", error);
//       onError(error);
//       // message.error("Upload failed");
//     });
// };

const CreateUser = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationKey: "createUser",
    mutationFn: createUser,
    onSuccess: async (data) => {
      await Swal.fire({
        title: "Success!",
        text: data?.message || "User has been successfully created.",
        icon: "success",
        confirmButtonText: "OK",
      });
      form.resetFields();
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  // const normFile = (e) => {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e?.fileList;
  // };

  // const normFile = ({ fileList }) => {
  //   console.log({ fileList });
  //   if (Array.isArray(fileList)) {
  //     return fileList.map((item) => item.response?.data).filter((item) => item !== undefined);
  //   }
  //   return fileList.response?.data ? [fileList.response?.data] : [];
  // };

  // const uploadProps = {
  //   name: "file",
  //   action: `${baseURL}/upload`,
  //   onChange(info) {
  //     if (info.file.status === "done") {
  //       Swal.fire({
  //         title: "Upload Success",
  //         text: `${info.file.name} uploaded successfully.`,
  //         icon: "success",
  //       });
  //     } else if (info.file.status === "error") {
  //       Swal.fire({
  //         title: "Upload Error",
  //         text: `${info.file.name} upload failed.`,
  //         icon: "error",
  //       });
  //     }
  //   },
  // };

  const handleFormSubmit = (values) => {
    const { name, designation, description, image, social } = values;
    console.log({ values });
    const body = {
      name,
      designation,
      description,
      image: image?.[0],
      social,
    };
    console.log(body);
    mutate(body);
  };
  return (
    <div className="h-screen flex flex-col items-center">
      <h2 className="mb-10 text-3xl font-semibold text-accent">Create User</h2>
      <div className="w-1/2">
        <Form form={form} name="register" layout="vertical" onFinish={handleFormSubmit} autoComplete="off">
          {/* Name Field */}
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input your name!" }]}>
            <Input placeholder="Enter name" />
          </Form.Item>

          {/* Designation Field */}
          <Form.Item
            name="designation"
            label="Designation"
            rules={[{ required: true, message: "Please input your designation!" }]}
          >
            <Input placeholder="Enter designation" />
          </Form.Item>

          {/* Description Field */}
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input a description!" }]}
          >
            <Input.TextArea placeholder="Enter description" />
          </Form.Item>

          {/* Social Links */}
          <Form.List name="social">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} align="baseline" style={{ display: "flex", marginBottom: 8 }}>
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      rules={[{ required: true, message: "Name is required" }]}
                    >
                      <Input placeholder="Social name (e.g., Facebook)" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "icon"]}
                      rules={[{ required: true, message: "Icon is required" }]}
                    >
                      <Input placeholder="Icon (e.g., fa-facebook)" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "link"]}
                      rules={[
                        { required: true, message: "Link is required" },
                        { type: "url", message: "Enter a valid URL" },
                      ]}
                    >
                      <Input placeholder="Link (e.g., https://facebook.com)" />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} style={{ color: "red" }} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} block>
                    Add Social Link
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

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

          {/* Submit Button */}
          <Form.Item>
            <Button className="button" type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateUser;

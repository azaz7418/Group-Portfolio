import { LockOutlined, MailOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { baseURL } from "../../main";

const getAllUser = () => {
  // const {data}= axios.get("/teams")
  const { data } = axios.post(`/teams`);

  return data;
};

const AllUser = () => {
  const [form] = Form.useForm();
  // const { data, isError } = useQuery({
  //   queryKey: ["allUser"],
  //   queryFn: getAllUser,
  // });
  // if (isError) {
  //   console.log("Error Happened");
  //   return <h1>Error Happened</h1>;
  // }

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props = {
    name: "photos",
    action: baseURL + "/upload",
    // headers: {
    //   authorization: "authorization-text",
    // },
    onChange(info) {
      // console.log({ info });
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        // message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <div className="  h-screen ">
      <h2 className="mb-10 text-3xl font-semibold text-accent">Create User</h2>
      <div className="flex justify-center items-center w-1/3">
        <Form
          className=" text-white w-full"
          name="register"
          initialValues={{
            remember: true,
          }}
          // onFinish={postFormData}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please Input Your Name!",
              },
            ]}
          >
            <Input placeholder="Input name" />
          </Form.Item>

          <Form.Item
            name="designation"
            rules={[
              {
                type: "text",
                message: "The Input Is Not Valid!",
              },
              {
                required: true,
                message: "Please Input Your Designation!",
              },
            ]}
          >
            <Input placeholder="Input Designation" />
          </Form.Item>

          <Form.Item
            name="description"
            validateFirst={true}
            rules={[
              {
                required: true,
                message: "Please Input Your Description!",
              },
            ]}
          >
            <Input placeholder="Input Description" />
          </Form.Item>
          <Form.Item
            name="image"
            validateFirst={true}
            rules={[
              {
                required: true,
                message: "Please Input Your Image!",
              },
            ]}
          >
            <Input placeholder="Input Image" />
          </Form.Item>
          <Form.Item name="image" label="Upload" getValueFromEvent={normFile}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button className="button" block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <div className="text-lg text-center font-semibold">
            Already Registered?{" "}
            <Link to="/auth/group/login" className=" text-xl text-[#00e187] font-semibold">
              Sign In
            </Link>
          </div>
        </Form>
      </div>
      <h2></h2>
    </div>
  );
};

export default AllUser;

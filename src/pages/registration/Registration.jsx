import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const createUser = (body) => {
  // console.log(body);
  return axios.post("/users/register", body);
};
const Registration = () => {
  const navigate = useNavigate();

  const { mutate, isError, error } = useMutation({
    mutationKey: "creatUser",
    mutationFn: createUser,
    onSuccess: async (data) => {
      await Swal.fire({
        title: "Success!",
        text: data.data?.Message || "You Have Successfully Registered.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/auth/group/login");
    },
  });
  const postFormData = (value) => {
    console.log(value);
    const { name, email, password } = value;
    const body = {
      name,
      email,
      password,
    };
    mutate(body);
    console.log(body);
    navigate("/login");
  };

  return (
    <div className="  h-screen grid grid-cols-3 items-center  my-auto">
      <h2></h2>
      <div>
        <div className=" flex justify-center items-center gap-4 h1 mb-14  text-center">
          <h2 className=" text-accent" style={{ fontFamily: "Roboto" }}>
            Knull
          </h2>
          <h2 className="text-amber-300 " style={{ fontFamily: "Satisfy" }}>
            IT
          </h2>
        </div>
        <Form
          className=" text-white"
          name="register"
          initialValues={{
            remember: true,
          }}
          onFinish={postFormData}
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
            <Input prefix={<UserOutlined />} placeholder="Input name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The Input Is Not Valid E-Mail!",
              },
              {
                required: true,
                message: "Please Input Your E-Mail!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Input Email" />
          </Form.Item>

          <Form.Item
            name="password"
            validateFirst={true}
            rules={[
              {
                required: true,
                message: "Please Input Your Password!",
              },
              {
                min: 6,
                message: "Min Length 6",
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
                message: "Password Must Contain At Least One Uppercase Letter, One Lowercase Letter, And One Symbol",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Input password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please Confirm Your Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(" Password does not match!"));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm password" />
          </Form.Item>

          <Form.Item>
            <Button className="button" block htmlType="submit">
              Sign up
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

export default Registration;

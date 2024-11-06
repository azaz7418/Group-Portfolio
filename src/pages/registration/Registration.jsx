import { Button, Form, Input } from "antd";
import axios from "axios";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

const createUser = (body) => {
  // console.log(body);
  return axios.post("/users/register", body);
};
const Registration = () => {
  const navigate = useNavigate();

  const { mutate, isError, error } = useMutation({
    mutationKey: "creatUser",
    mutationFn: createUser,
    //   onSuccess: async (data) => {
    //     await Swal.fire({
    //       title: "Success!",
    //       text: data.response?.Message || "You Have Successfully Registered.",
    //       icon: "success",
    //       confirmButtonText: "OK",
    //     });

    //     navigate("/login");
    //   },
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
          label={<span style={{ fontSize: "16px", color: "white" }}>Name</span>}
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
          name="email"
          label={<span style={{ fontSize: "16px", color: "white" }}>E-mail</span>}
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
          <Input placeholder="Input Email" />
        </Form.Item>

        <Form.Item
          label={<span style={{ fontSize: "16px", color: "white" }}>Password</span>}
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
          <Input.Password placeholder="Input password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label={<span style={{ fontSize: "16px", color: "white" }}>Confirm Password</span>}
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
          <Input.Password placeholder="Confirm password" />
        </Form.Item>

        <Form.Item>
          <Button className="button" block type="primary" htmlType="submit">
            Sine up
          </Button>
        </Form.Item>
        <div className="text-lg text-center font-semibold">
          Already Registered?{" "}
          <Link to="/login" className=" text-xl text-[#00e187] font-semibold">
            Sing In
          </Link>
        </div> 
      </Form>
      <h2></h2>
    </div>
  );
};

export default Registration;

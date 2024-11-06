import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import axios from "axios";
import { useMutation } from "react-query";

const loginFunction = async (body) => {
  const { data } = await axios.post("/users/login", body);
  return data;
};
const Login = () => {
  const { mutate, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: (body) => loginFunction(body),
    onSuccess: async (data) => {

        console.log(data)
    //   if (data?.token) {
    //     const token = `Bearer ${data.token}`;
    //     try {
    //       const { data: userData } = await axios.get("/users/profile", {
    //         headers: { Authorization: token },
    //       });
    //       if (userData.success) {
    //         dispatch(setAuth({ token, user: userData?.data }));
    //       }
    //     } catch (error) {
    //       // eslint-disable-next-line no-console
    //       console.log(error);
    //     }
    //   }

    //   Swal.fire({
    //     title: "Success!",
    //     text: "You have successfully logged in.",
    //     icon: "success",
    //     confirmButtonText: "OK",
    //   });

    //   navigate("/");
    },
  });
  const onFinish = (values) => {
    mutate(values);
    console.log("Received values of form: ", values);
  };

  return (
    <div className="  h-screen grid grid-cols-3 items-center  my-auto">
      <h1></h1>
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please Input Your Email!",
            },
            {
              type: "email",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please Input Your Password!",
            },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <a href="">Register now!</a>
        </Form.Item>
      </Form>
      <h1></h1>
    </div>
  );
};

export default Login;

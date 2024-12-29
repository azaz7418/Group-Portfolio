import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../redux/features/authSlice";
import Swal from "sweetalert2";

const loginFunction = async (body) => {
  const { data } = await axios.post("/users/login", body);
  return data;
};
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: (body) => loginFunction(body),
    onSuccess: async (data) => {
      if (data?.token) {
        const token = `Bearer ${data.token}`;
        try {
          const { data: userData } = await axios.get("/users/profile", {
            headers: { Authorization: token },
          });
          if (userData.success) {
            dispatch(setAuth({ token: data?.token, user: userData?.data }));
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      }

      Swal.fire({
        title: "Success!",
        text: "You have successfully logged in.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/");
    },
  });
  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <div className="  h-screen grid grid-cols-3 items-center  my-auto">
      <h1></h1>
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
              <Link>Forgot password</Link>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button className="button" block htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
          <div className="text-lg text-white text-center font-semibold">
            or{" "}
            <Link to="/auth/group/registration" className=" text-xl text-[#00e187] hover:text-[#00ff99] font-semibold">
              Register now!
            </Link>
          </div>
        </Form>
      </div>

      <h1></h1>
    </div>
  );
};

export default Login;

import { Button, Form, Input, Modal, Space, Upload } from "antd";
import { updateUser } from "../../constants/userConstant";
import { useQueryClient, useMutation } from "react-query";
import Swal from "sweetalert2";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { baseURL } from "../../main";

const UpdateUser = ({ isModalOpen, editData, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate: updateUsers } = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("createUser");
      Swal.fire({
        title: "Updated!",
        text: "User information has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to update user.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    // If it's a single file, wrap it in an array to make it compatible with Upload component
    return e?.fileList || [];
  };

  const uploadProps = {
    name: "file",
    action: `${baseURL}/upload`,
    onChange(info) {
      if (info.file.status === "done") {
        Swal.fire({
          title: "Upload Success",
          text: `${info.file.name} uploaded successfully.`,
          icon: "success",
        });
      } else if (info.file.status === "error") {
        Swal.fire({
          title: "Upload Error",
          text: `${info.file.name} upload failed.`,
          icon: "error",
        });
      }
    },
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      updateUsers({ id: editData._id, body: values });
      setIsModalOpen(false);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  return (
    <Modal title="Update User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: editData?.name,
          designation: editData?.designation,
          description: editData?.description,
          social: editData?.social || [],
          // image: editData?.image
          //   ? [{ url: editData.image }] // Ensure image is wrapped in an array if it's a URL
          //   : [
          //       {
          //         url: "https://img.freepik.com/free-photo/surprised-handsome-man-showing-banner-pointing-up_176420-18869.jpg?w=826&t=st=1726065625~exp=1726066225~hmac=25b99f94eb9970f25faeb231660e587d365738088b811d428004bc6aaaeb9245",
          //       },
          //     ],
        }}
        onFinish={handleOk}
      >
        <Form.Item name="name" label="Name">
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item name="designation" label="Designation">
          <Input placeholder="Enter designation" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>
        <Form.List name="social">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} align="baseline" style={{ display: "flex", marginBottom: 8 }}>
                  <Form.Item {...restField} name={[name, "name"]}>
                    <Input placeholder="Social name (e.g., Facebook)" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "icon"]}>
                    <Input placeholder="Icon (e.g., fa-facebook)" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "link"]}
                    rules={[{ type: "url", message: "Enter a valid URL" }]}
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
        {/* <Form.Item
            name="image"
            label="Upload Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload {...uploadProps} listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default UpdateUser;

import { Button, Form, Input, Modal, Space } from "antd";
import { useQueryClient, useMutation } from "react-query";
import Swal from "sweetalert2";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { updateUser } from "../../../constants/userConstant";
import UploadImage from "../../../components/UploadImage";
import { useEffect, useState } from "react";

const UpdateUser = ({ isModalOpen, editData, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  useEffect(() => {
    form.setFieldsValue({ ...editData, image: Array.isArray(editData.image) ? editData.image : [editData.image] });
  }, [editData]);

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

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      updateUsers({
        id: editData._id,
        body: { ...values, image: Array.isArray(values.image) ? values.image[0] : values.image },
      });
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
      </Form>
    </Modal>
  );
};

export default UpdateUser;

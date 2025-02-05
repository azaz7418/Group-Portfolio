"use client";

import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const uploadButton = (
  <button type="button">
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </button>
);

const UploadImage = ({ maxCount, name, label, listType, setIsLoading, form }) => {
  // let fileList;
  const [fileList, setFileList] = useState([]);
  const files = form.getFieldValue(name);
  useEffect(() => {
    // const fileList = Array.isArray(files) ? files : files ? [files] : [];
    if (Array.isArray(files)) {
      setFileList(files.filter((item) => item.url));
    } else if (files?.url) {
      setFileList([files]);
    } else {
      setFileList([]);
    }
  }, [form, name, files]);

  const customUpload = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("photos", file);
    setIsLoading(true);
    axios
      .post("/upload", formData)
      .then(({ data }) => {
        if (data) {
          onSuccess(data, file);
          const currentFiles = form.getFieldValue(name).filter((image) => image?.url) || [];
          const updatedFiles =
            currentFiles.length >= maxCount ? [...currentFiles.slice(1), data?.data] : [...currentFiles, data?.data];

          form.setFieldsValue({ [name]: updatedFiles });
        } else {
          throw new Error("No response data");
        }
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        onError(error);
        toast.error("Upload failed");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePreview = (file) => {
    const imageUrl = file.url || file.preview;
    Swal.fire({
      imageUrl: imageUrl,
      imageAlt: "Preview",
      showConfirmButton: false,
      background: "white",
      padding: "0",
      width: "auto",
      heightAuto: false,
      customClass: {
        popup: "no-padding-swal",
        image: "no-margin-image",
      },
    });
  };

  return (
    <>
      <Form.Item name={name} label={label} layout="horizontal" getValueFromEvent={({ fileList }) => fileList}>
        <Upload
          fileList={fileList}
          customRequest={customUpload}
          onRemove={(file) => {
            const updatedFiles = fileList.filter((image) => image.uid !== file.uid);
            form.setFieldsValue({ [name]: updatedFiles });
            setFileList(updatedFiles);
            console.log(`${file.name} file removed.`);
            // toast.success(`${file.name} file removed.`);
          }}
          supportServerRender={true}
          listType={listType}
          maxCount={maxCount + 1}
          onChange={({ file }) => {
            if (file.status === "error") toast.error(`${file.name} file upload failed.`);
          }}
          onPreview={handlePreview}
        >
          {["text", "picture"].includes(listType) ? (
            <Button disabled={false} icon={<UploadOutlined />}>
              Upload
            </Button>
          ) : (
            uploadButton
          )}
        </Upload>
      </Form.Item>
    </>
  );
};

export default UploadImage;

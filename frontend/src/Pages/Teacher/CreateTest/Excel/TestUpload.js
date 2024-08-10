import React from "react";
import { message } from "antd";
import ExcelUpload from "./ExcelUpload";

const TestUploadPage = () => {
  const handleFileUpload = async (data) => {
    try {
      const response = await fetch("/teacher/create-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        message.success(
          "Test successfully uploaded and saved to the database."
        );
      } else {
        message.error("Failed to upload test.");
      }
    } catch (error) {
      console.error("Error occurred while uploading the test:", error);
      message.error("An error occurred during the upload.");
    }
  };

  return (
    <div>
      <h2>Upload Test from Excel</h2>
      <ExcelUpload onFileUpload={handleFileUpload} />
    </div>
  );
};

export default TestUploadPage;

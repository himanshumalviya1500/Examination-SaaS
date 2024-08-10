import React from "react";
import readXlsxFile from "read-excel-file";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ExcelUpload = ({ onFileUpload }) => {
  const handleUpload = async (file) => {
    try {
      console.log("Received file:", file);

      // Read file
      const rows = await readXlsxFile(file);
      console.log("Rows read from file:", rows);

      const headers = rows[0];
      const data = rows.slice(1).map((row) => {
        let obj = {};
        headers.forEach((header, index) => {
          let value = row[index];

          // Convert escaped strings to proper JSON
          if (typeof value === "string") {
            try {
              value = JSON.parse(value.replace(/\\/g, ""));
            } catch (e) {
              // If parsing fails, keep the original string
              console.warn(
                `Could not parse JSON for field "${header}":`,
                value
              );
            }
          }

          obj[header] = value;
        });
        return obj;
      });

      // If you only want the first object, use data[0]
      const firstDataObject = data.length > 0 ? data[0] : {};

      console.log("Parsed data:", firstDataObject);
      onFileUpload(firstDataObject); // Pass only the first object
    } catch (error) {
      console.error("Error reading file:", error);
      message.error(
        "Failed to read the file. Please ensure it's a valid Excel file."
      );
    }
  };

  return (
    <Upload
      customRequest={({ file, onSuccess, onError }) => {
        console.log("Custom request file:", file);

        // Use FileReader to read the file if needed
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            console.log("FileReader result:", reader.result);

            // Convert ArrayBuffer to Blob for readXlsxFile
            const blob = new Blob([reader.result], { type: file.type });
            const fileForReadXlsx = new File([blob], file.name, {
              type: file.type,
            });

            await handleUpload(fileForReadXlsx);
            onSuccess();
          } catch (error) {
            onError(error);
          }
        };

        reader.readAsArrayBuffer(file);
      }}
      showUploadList={false}
      accept=".xlsx"
    >
      <Button icon={<UploadOutlined />}>Upload Excel File</Button>
    </Upload>
  );
};

export default ExcelUpload;

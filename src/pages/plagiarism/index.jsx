import { useRef, useState } from "react";
import { Button, Box, Container, TextField } from "@mui/material";
import axios from "axios";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LinkIcon from "@mui/icons-material/Link";

const TYPE_BOX = {
  url: "url",
  text: "text",
  file: "file",
};

const PlagiarismPage = () => {
  const requestBodyData = useRef(null);
  const [response, setRespone] = useState(null);
  const [typeBox, setTypeBox] = useState(TYPE_BOX.file);
  // const [fileContent, setFileContent] = useState("");

  const fileContent = useRef("");
  const [sentences, setSentences] = useState([]);

  // Hàm để phân tách nội dung thành các câu và xử lý in đậm
  const processContent = (content) => {
    // Phân tách nội dung thành các câu
    const sentenceArray = content.split(/(?<=\.)\s*/); // Phân tách tại dấu chấm và khoảng trắng
    console.log("array", sentenceArray)
    return sentenceArray.map((sentence, index) => {
      // Kiểm tra nếu câu này có trong mảng sentences
      console.log("sentences: ", sentences)
      console.log("sentence:", sentence)
      let isBold = false
      sentences.forEach(item => {
        if (sentence.includes(item))
          isBold= true
      }) //false
      console.log(isBold)
      // Nếu câu trùng với mảng sentences, in đậm câu đó
      return (
        <span key={index}>
          {<p className={isBold ? "text-red-500" : ""}>{sentence}</p>}
          <br />
        </span>
      );
    });
  };

  const handleSubmit =  (event, bodyData) => {
    event.preventDefault(); // Ngăn chặn tải lại trang

    const data = {};
    const form = new FormData();
    console.log("request body data",bodyData )
    switch (typeBox) {
      case TYPE_BOX.url:
        data.url = bodyData;
        break;
      case TYPE_BOX.text:
        data.text = bodyData;
        break;
      case TYPE_BOX.file:
        form.append("file", bodyData);
        break;
    }


    axios
      .post("http://localhost:8080/file/detect", form)
      .then((response) => {
        console.log("detect response: ", response.data.data);
        let sentenceList = response.data.data.sentences.map(item => item.sentence)

        setRespone(response.data);
        setSentences(sentenceList);
      })
      .catch((error) => {
        
      });
  };
  const renderComponent = (type) => {
    // console.log(type);

    const handleChangeInput = (e) => {
      const typeInput = e.target.type;

      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();

        // Đọc nội dung file dưới dạng văn bản
        reader.onload = function (e) {
          // setFileContent(e.target.result);
          fileContent.current = e.target.result
        };

        // Đọc file
        reader.readAsText(file);
      }


      switch (typeInput) {
        case "file":
          e.target?.files?.[0] && (requestBodyData.current = (e.target.files[0]));
          break;
        case "text":
          requestBodyData.current = (e.target.value);
          break;
        case "url":
          requestBodyData.current = (e.target.value);
          break;
      }

      console.log(typeInput)
    };

    switch (type) {
      case TYPE_BOX.file:
        return <input type="file" onClick={handleChangeInput} />;

      case TYPE_BOX.text:
        return (
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Nhập chữ tại đây..."
            margin="normal"
            onChange={handleChangeInput}
          />
        );

      case TYPE_BOX.url:
        return (
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Nhập duong dan..."
            margin="normal"
            onChange={handleChangeInput}
          />
        );
    }
  };

  return (
    <Container
      maxWidth={"xl"}
      className="min-h-60 h-auto shadow-xl rounded-md flex justify-between"
    >
      <Box
        component="form"
        onSubmit={(e) => handleSubmit(e, requestBodyData.current )}
        sx={{ mt: 2 }}
        className="w-full"
      >
        <div id="content" className="py-4">
          {renderComponent(typeBox)}
        </div>
        <div
          id="footer"
          className="flex justify-between items-center px-16 py-4"
        >
          <div id="footer-option">
            <Button
              onClick={() => {
                setTypeBox(TYPE_BOX.text);
              }}
            >
              <FormatAlignCenterIcon />
            </Button>
            <Button
              onClick={() => {
                setTypeBox(TYPE_BOX.file);
              }}
            >
              <InsertDriveFileIcon />
            </Button>
            <Button
              onClick={() => {
                setTypeBox(TYPE_BOX.url);
              }}
            >
              <LinkIcon />
            </Button>
          </div>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Kiem tra
          </Button>
        </div>
      </Box>
      {response && (
        <Box
          sx={{ mt: 2 }}
          className="mx-2 mb-4 px-4 py-4 bg-gray-100 rounded-lg shadow-md text-pretty min-w-96"
        >
          <div id="name" className="flex">
            <strong className="px-4">File name: </strong>
            <span
              className={response.titlePlag ? "text-red-500" : "text-green-500"}
            >
              {response.data.fileName}
            </span>
          </div>

          <div id="plag" className="flex">
            <strong className="px-4">Detection: </strong>
            <span
              className={
                response.data.plag > 0.3 ? "text-red-500" : "text-green-500"
              }
            >
              {(response.data.plag * 100).toFixed(2)}
            </span>
          </div>

          <div id="refer">
            {response.data.sentences.forEach((item) => {
              // console.log(item);
              return (
                <p className="p-4 text-center text-black-500 hover:text-blue-500 cursor-pointer">
                  {item.sentence}
                  <span className=" left-1/2 transform -translate-x-1/2 top-[-30px] opacity-0 hover:opacity-100 text-red-500 bg-yellow-300 px-2 py-1 rounded-md transition-opacity">
                    {item.sourceFile}
                  </span>
                </p>
              );
            })}
          </div>
        </Box>
      )}
      {/* Hiển thị nội dung tệp và in đậm các câu cần thiết */}
      <Box
        className="w-full max-w-2xl p-4 border rounded-md bg-gray-50"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {fileContent.current
          ? processContent(fileContent.current)
          : "Vui lòng chọn một tệp để hiển thị nội dung."}
      </Box>
    </Container>
  );
};

export default PlagiarismPage;

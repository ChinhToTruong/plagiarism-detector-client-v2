import { useState } from "react";
import { Button, Box, Container } from "@mui/material";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import CustomPieChart from "../../components/PieChart/PieChart";
import { Link } from "react-router-dom";

const PlagiarismPage = () => {
  const [file, setFile] = useState(null);
  const [plagiarismRate, setPlagiarismRate] = useState(null);
  const [originalityRate, setOriginalityRate] = useState(null);
  const [textContent, setTextContent] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      // Lưu nội dung tệp vào state
      setTextContent(e.target.result);
    };

    // Kiểm tra loại tệp
    if (file.type === "text/plain") {
      reader.readAsText(file); // Đọc tệp dưới dạng văn bản
    } else {
      alert("Vui lòng tải lên tệp TXT!");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn tải lại trang

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch("http://localhost:8080/plagiarism/9135069", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let data = JSON.parse(result);
        console.log(data);
        setPlagiarismRate(data.data.data.plagiarism);
        setOriginalityRate(data.data.data.originality);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container
      maxWidth={"xl"}
      className="min-h-60 h-auto shadow-xl rounded-md flex justify-between"
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <input type="file" onChange={handleFileChange} required />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Kiem tra
        </Button>
      </Box>
      {plagiarismRate && (
        <Box sx={{ mt: 2 }}>
          <p>plagiarism rate: {plagiarismRate} </p>
          <p>originality rate: {originalityRate}</p>
          <Link
            to={
              "https://plagiarismsearch.com/r/9135069?key=9c9b5b9451a8173402cd8bbcb4be9ad9"
            }
          >
            Bam vao link de xem bao cao chi tiet
          </Link>
        </Box>
      )}
    </Container>
  );
};

export default PlagiarismPage;

import { useState } from "react";
import { Button, Box, Container } from "@mui/material";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import CustomPieChart from "../../components/PieChart/PieChart";
import { Link, Navigate } from "react-router-dom";

const PlagiarismPage = () => {
  const [file, setFile] = useState(null);
  const [plagiarismRate, setPlagiarismRate] = useState(null);
  const [originalityRate, setOriginalityRate] = useState(null);
  const [link, setLink] = useState("");
  const [id, setId] = useState("");
  const [key, setKey] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn tải lại trang

    let data = JSON.stringify({
      url: "https://vi.wikipedia.org/wiki/B%C3%AD_t%C3%ADch_H%C3%B2a_Gi%E1%BA%A3i",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/plagiarism/add-document",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const documentId = response.data.data;
        setId(documentId);
        getDocument(id); //9148065
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDocument = (id) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:8080/plagiarism/${id}`,
      headers: {},
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response.data.data.data);
        const key = response.data.data.data.auth_key;
        setKey(key);
        const link = `https://plagiarismsearch.com/r/${id}?key=${key}`;
        setLink(link);
      })
      .catch((error) => {
        console.error(error);
      });
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
      {link && (
        <Box sx={{ mt: 2 }}>
          <p>plagiarism rate: {plagiarismRate} </p>
          <p>originality rate: {originalityRate}</p>
          <Link
            to={`https://plagiarismsearch.com/r/${id}?key=${key}`}
            accessKey="bien.nd203327@sis.hust.edu.vn:F36O6VSpQEAjqDVpz94d3MB6BPELxZQUO6CRcBOmUK3WVPXT9EoKgW-219039683"
          >
            {`https://plagiarismsearch.com/r/${id}?key=${key}`}
          </Link>
        </Box>
      )}
    </Container>
  );
};

export default PlagiarismPage;
